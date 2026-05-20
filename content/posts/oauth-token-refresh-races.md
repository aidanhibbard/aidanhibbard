---
title: 'OAuth token refresh races'
date: '2026-01-08'
tags: ['oauth', 'postgres', 'integrations']
description: 'Two requests, one refresh token, and a partner integration that worked 99.9% of the time.'
robots: index, follow
sitemap:
  lastmod: 2026-01-08
ogImage:
  props:
    title: 'OAuth token refresh races'
    description: 'Two requests, one refresh token, and a partner integration that worked 99.9% of the time.'
---

# OAuth token refresh races

We had a partner integration that was "basically fine." Support tickets were rare. Metrics looked green. The kind of integration you forget exists until a customer forwards you a screenshot at 6pm on a Friday.

The screenshot showed our product failing to sync their external account. The error message was helpfully vague: **Authentication failed.**

## What we thought we knew

Our OAuth flow was standard:

- Access token stored per connection
- Refresh when expired
- Retry the upstream call once after refresh

We had done this on three other integrations without drama. Same library, same pattern, same `expires_at` column in Postgres.

What we did not have was a lock.

## The race

Two background jobs for the same connection can run at the same time. That part is normal. What is less normal is both jobs noticing the access token is expired within the same few hundred milliseconds.

Both jobs call refresh. OAuth providers typically invalidate the old refresh token when they issue a new one. Job A wins. Job B gets a 400 and marks the connection as broken.

From the user's perspective the integration "randomly broke."

```typescript [refresh-access-token.ts]
const refreshAccessToken = async (connectionId: string) => {
  const connection = await db.connections.find(connectionId)

  if (connection.expiresAt > Date.now()) {
    return connection.accessToken
  }

  const tokens = await oauthClient.refresh(connection.refreshToken)

  await db.connections.update(connectionId, {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: tokens.expiresAt,
  })

  return tokens.accessToken
}
```

Looks reasonable. Ships to prod all the time. Still wrong.

## The fix we should have shipped first

We added a per-connection advisory lock around refresh:

```typescript [refresh-access-token.ts]
const refreshAccessToken = async (connectionId: string) => {
  return await withConnectionLock(connectionId, async () => {
    const connection = await db.connections.find(connectionId)

    if (connection.expiresAt > Date.now()) {
      return connection.accessToken
    }

    const tokens = await oauthClient.refresh(connection.refreshToken)

    await db.connections.update(connectionId, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    })

    return tokens.accessToken
  })
}
```

Job B now waits, reads the freshly updated token, and moves on. Boring. Correct.

We also started storing `refreshingAt` as a belt-and-suspenders guard for environments where advisory locks are annoying to reason about in tests.

## What we learned after

**Refresh is a mutation, not a read.** Treat it like a payment capture or inventory decrement. You would not let two checkout flows decrement stock without coordination.

**"It works in staging" is not a OAuth strategy.** Staging has one fake connection and a human clicking buttons. Production has cron, webhooks, and users mashing retry.

**Log the refresh outcome, not just the API call.** We added structured logs with `connectionId`, `jobId`, and whether we hit refresh or cache. Support can answer tickets without waking me up.

The integration went back to being the kind you forget exists. That is the goal.
