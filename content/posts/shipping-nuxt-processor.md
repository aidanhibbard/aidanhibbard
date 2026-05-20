---
title: 'Why I built nuxt-processor'
date: '2025-09-20'
tags: ['nuxt', 'bullmq', 'open-source']
description: 'Background jobs in Nuxt kept being a side quest. I wanted them to be boring.'
theme:
  light:
    - '#f0fdfa'
    - '#cffafe'
    - '#06b6d4'
  dark:
    - '#ecfeff'
    - '#a5f3fc'
    - '#22d3ee'
robots: index, follow
sitemap:
  lastmod: 2025-09-20
ogImage:
  props:
    title: 'Why I built nuxt-processor'
    description: 'Background jobs in Nuxt kept being a side quest. I wanted them to be boring.'
---

# Why I built nuxt-processor

Every Nuxt app I have worked on eventually needed background jobs.

Send email. Sync integrations. Rebuild search indexes. Delete things GDPR said we had to delete yesterday.

And every time, the setup looked the same: copy a BullMQ example into `server/`, wire Redis, pray the worker actually starts in production, wonder why local dev needs three terminals.

I got tired of reinventing that treadmill.

## What I wanted

- Jobs defined next to the Nuxt code they touch
- Workers that start with the Nitro server in dev without ceremony
- Typed payloads shared between enqueue and handler
- Something I could drop into a side project and a production app with the same ergonomics

Nuxt already gives you server routes, runtime config, and a build pipeline that understands TypeScript. The missing piece was **a convention for work that should not block the request**.

## What nuxt-processor does

At a high level:

```typescript [server/tasks/send-welcome-email.ts]
export default defineTask({
  meta: {
    name: 'send-welcome-email',
  },
  run: async ({ payload }) => {
    await sendEmail(payload.userId)
  },
})
```

Enqueue from a route:

```typescript [server/api/register.post.ts]
await tasks['send-welcome-email'].enqueue({ userId: user.id })
```

The module handles worker registration, queue naming, and the dev ergonomics that used to live in a README I never finished.

It is not trying to be a generic job framework for every runtime. It is trying to be the obvious choice **inside Nuxt**.

## What I learned shipping it

**People do not read long install guides.** The module works when `nuxt.config.ts` and one task file get you from zero to "job ran" in ten minutes.

**Examples are the real docs.** I maintain a minimal app that sends an email, retries a flaky HTTP call, and schedules cron work. If the example breaks, the release is broken.

**Open source is support with strangers.** Issues teach you what assumptions were actually yours alone. "Why doesn't this start in Docker?" came up fast. Good. Fixed.

## Where it fits in my head

Request handlers answer users. Tasks answer the business five minutes later without blocking the UI.

If you are already on Nuxt and reaching for "just a small BullMQ script," you might not need a module. If you are on your third copy-paste of the same worker bootstrap, maybe you do.

Either way, background work deserves first-class wiring, not a forgotten `scripts/` folder.

That is the whole pitch.
