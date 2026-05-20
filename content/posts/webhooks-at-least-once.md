---
title: 'Webhooks are at-least-once whether you like it or not'
date: '2025-12-14'
tags: ['webhooks', 'postgres', 'stripe']
description: 'Your handler ran twice. Your database only noticed once. That is not a vendor bug.'
theme:
  light:
    - '#f8fafc'
    - '#dbeafe'
    - '#60a5fa'
  dark:
    - '#eff6ff'
    - '#bfdbfe'
    - '#93c5fd'
robots: index, follow
sitemap:
  lastmod: 2025-12-14
ogImage:
  props:
    title: 'Webhooks are at-least-once whether you like it or not'
    description: 'Your handler ran twice. Your database only noticed once. That is not a vendor bug.'
---

# Webhooks are at-least-once whether you like it or not

Every webhook provider secretly agrees on one thing: **delivery is not a contract, it is a hope.**

Stripe will retry. Your partner's sandbox will retry harder. Your own staging environment will retry because you fat-fingered a ngrok URL and got curious.

If your handler assumes exactly-once, you do not have a webhook system. You have a lottery.

## The bug that looked like fraud prevention

We shipped a feature that granted credits when a subscription renewed. Simple route:

```typescript [webhooks/stripe.post.ts]
export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, stripeEventSchema)
  const subscription = payload.data.object

  await grantCredits(subscription.customerId, subscription.planCredits)

  return { received: true }
})
```

Stripe delivered the event twice within ten seconds during a network blip. One customer got double credits. Finance noticed before engineering did, which is never the vibe you want.

## Idempotency keys are the whole game

We already had idempotency keys for our public API. Webhooks got the same treatment:

```typescript [webhooks/stripe.post.ts]
export default defineEventHandler(async (event) => {
  const payload = await readValidatedBody(event, stripeEventSchema)

  const existing = await db.webhookEvents.findById(payload.id)

  if (existing) {
    return { received: true, duplicate: true }
  }

  await db.webhookEvents.create({
    id: payload.id,
    type: payload.type,
    receivedAt: new Date(),
  })

  await handleStripeEvent(payload)

  return { received: true }
})
```

The insert becomes the lock. Unique constraint on `payload.id`. Second delivery hits the constraint, returns 200, goes home.

Important detail: **record the event before doing the side effect**, not after. If you grant credits first and crash before logging, you will hate yourself on the retry.

## Fast 200, slow work

We still return 200 quickly, but heavy work goes to a queue now. The webhook table proves we accepted the event. The job system proves we processed it, with its own idempotency.

That split saved us when a downstream email provider went sideways for twenty minutes. Stripe stopped hammering us because we acknowledged promptly. Jobs retried on our terms.

## Things I keep repeating

**A 200 response means "I took responsibility," not "I finished."**

**Tests should replay the same payload twice on purpose.** If your suite never simulates duplicates, production will do it for you.

**Vendor docs are optimistic.** Read the retry section. Believe the retry section.

Webhooks are integration glue. Idempotency is the glue stick.
