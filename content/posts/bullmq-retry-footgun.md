---
title: 'The BullMQ retry setting that doubled our load'
date: '2026-02-18'
tags: ['bullmq', 'redis', 'queues']
description: 'We wanted resilience. We got a DDoS we authored ourselves.'
robots: index, follow
sitemap:
  lastmod: 2026-02-18
ogImage:
  props:
    title: 'The BullMQ retry setting that doubled our load'
    description: 'We wanted resilience. We got a DDoS we authored ourselves.'
---

# The BullMQ retry setting that doubled our load

Queues are how you tell yourself you have grown up as an engineer. Retries are how you tell yourself you are optimistic.

We were both.

## Background

We ran nightly aggregation jobs in BullMQ. Each job pulled a day's worth of events, rolled them up, and wrote summary tables for dashboards. Boring, essential, usually invisible.

One Tuesday the Redis CPU graph learned to fly.

## The config that lied to us

```typescript [queues/rollup.worker.ts]
createWorker('rollup', handler, {
  connection: redis,
  settings: {
    backoffStrategy: exponentialBackoff,
  },
  limiter: {
    max: 50,
    duration: 1000,
  },
})

queue.add('rollup', payload, {
  attempts: 10,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
})
```

Looks responsible. Exponential backoff. Rate limiter. Ten attempts feels generous, not reckless.

Except our handler threw on a **partial data condition** that was not transient. A partner export arrived empty. We treated that as an exception. BullMQ retried. Still empty. Still an exception. Ten times. Across thousands of tenants.

We did not have a retry storm. We had a retry climate.

## Fixing the category mistake

Not every failure should retry. We split errors into two buckets:

```typescript [queues/rollup.worker.ts]
const handler = async (job: Job<RollupPayload>) => {
  try {
    await runRollup(job.data)
  }
  catch (error) {
    if (error instanceof EmptyExportError) {
      await markTenantSkipped(job.data.tenantId, error.message)
      return
    }

    throw error
  }
}
```

Permanent failures exit cleanly. Transient failures still retry with backoff.

We also lowered default attempts for batch jobs from ten to three. If something is still broken after three tries with exponential backoff, a human should look.

## Observability we added late

Dashboards now chart:

- Attempt number at success time
- Jobs dead-lettered by error class
- Rolling average job duration per queue

The metric that actually helped was **`attempts > 1` rate**. If that spikes, something is throwing that should not be throwing.

## Takeaway

Retries amplify behavior. If your handler is wrong, retries make it wrong faster.

Design queues like you design APIs: explicit failure modes, idempotent handlers, and a path for "this is not getting better."

Your future on-call self will send you coffee, not curse your name.
