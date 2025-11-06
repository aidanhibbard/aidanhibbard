---
title: 'Debugging a memory leak in a Next app'
date: '2025-11-11'
tags: ['next', 'sentry', 'inngest']
description: 'Finding a needle in a haystack, blindfolded, and the hay is on fire.'
---

# Debugging a memory leak in a Next app

Before continuing this piece I want to give a big shoutout to the folks over at [Railway](railway.com), their recommendations were a big contribution.

## Setup

If you can't tell from the article tags our setup is pretty consistent with most new projects.

- [NextJS](https://nextjs.org/)

- [Inngest](https://www.inngest.com/) for queues

- [Sentry](https://sentry.io) for reporting

The only difference between this, and most Next apps is that we deploy to a dedicated instance instead of "serverless".

## History

The first sign of the problem was that our app was restarted early morning roughly one month before the time of writing this article.

We rushed to check metrics, and found no spikes in usage, in fact it looked baseline compared to the historical data we had.

We checked the logs only to find the following error:

```bash [logs]
RangeError: Maximum call stack size exceeded
    at getCloneableBody (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/body-streams.js:46:24)
    at resolveRoutes (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-utils/resolve-routes.js:111:101)
    at handleRequest (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-server.js:288:102)
    at requestHandlerImpl (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-server.js:485:19)
    at requestListener (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/start-server.js:226:19)
    at emit (node:events:518:28)
    at apply (/app/.next/server/instrumentation.js:1:51277)
    at apply (/app/.next/server/chunks/834.js:4:25204)
Exception in PromiseRejectCallback:
node:internal/process/promises:183
function promiseRejectHandler(type, promise, reason) {
                             ^
RangeError: Maximum call stack size exceeded
    at promiseRejectHandler (node:internal/process/promises:183:30)
    at getCloneableBody (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/body-streams.js:49:13)
    at resolveRoutes (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-utils/resolve-routes.js:111:101)
    at handleRequest (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-server.js:288:102)
    at requestHandlerImpl (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-server.js:485:19)
    at requestListener (/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/start-server.js:226:19)
    at emit (node:events:518:28)
    at apply (/app/.next/server/instrumentation.js:1:51277)
/app/node_modules/.pnpm/next@15.5.4_@babel+core@7.28.4_@opentelemetry+api@1.9.0_react-dom@19.0.0_react@19.0.0__react@19.0.0/node_modules/next/dist/server/lib/router-utils/resolve-routes.js:201
        async function handleRoute(route) {
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
```

Okay... We know this issue wont be fixed within a single sprint, so up the replicas, and up the amount of restarts before killing the instance.

## Diving in

I went to the NextJS repository to find the methods called out in the stack trace, and [found them in the router](https://github.com/vercel/next.js/blob/ed41ac1a74305c97d281229696ac069556f020f9/packages/next/src/server/lib/router-utils/resolve-routes.ts#L337). Routes are involved? Promises getting rejected? Probably an infinite redirect loop.

Problem is no users had reported an infinite redirect, and we didn't have any potential culprits on our server.

My next thought was SSR components, could we be sending massive payloads to the client through them causing the route to fail?

We had one data hungry component, and that was our sidebar. It had a searchable list of all businesses belonging to a user. Problem was we never shrunk the data being sent to the client, the query for the side bar business list included the entire config for every business. It also re-fetched everytime you navigated pages since it re-rendered.

So with some "chaos engineering" (clicking really fast on our sidebar to navigate) it would eventually bring down the instance.

Okay, shrink the payload, and fix any unecessary re-renders, it resolves the issue right?

I shipped this fix to prod, and within twenty minutes of the release, production restarted again.

> It does tell us something. Though I have no idea what. - Dr House

## Back to the drawing board

After re-reviewing there were a few "known facts" that we had

- We noticed the staging server was not crashing, and had consistent uptimes for deploys

- Production continues restarting through the night when we have virtually no users

Based on the above, I decided to focus my attention to our server side logic. We depend on vendor webhooks that come in 24/7 so I reviewed some of our traffic on those endpoints. These endpoints dont get any requests on staging unless we do a test request from the vendors UI, so this lines up with what we see.

I found something that I was surprised no one had noticed before:

A common pattern on our webhooks was to create a `SUCCESS` constant at the top of each webhook.

```typescript [webhook/route.ts]
const SUCCESS = new Response(
  JSON.stringify({
    success: true
  })
)
```

So the first request to a webhook when the app came back back up would get a response of 200 with the json. However that response was used up by the first request, so every subsequent response only got a code of 200 with no json.

So I turned out SUCCESS constant into a simple factory.

```typescript [webhook/route.ts]
const SUCCESS = () => new Response(
  JSON.stringify({
    success: true
  })
)
```

After shipping this change we still had restarts, but now our vendors were happier because our responses to their events finally followed spec.

## Starting our app with Node

We had set our restart limit to 10K while we worked through this thinking that if the app went down Railway would keep handling it for us.

Pretty quickly we learned we did not have that luxury when a instance went down.

Railway like most hosts listens for exit codes from your service to know what is going on. It turns out our next app bootstraps with the proprietary `next start` which does _something_ other than starting an entry point with node.

I'm used to more "modern" frameworks such as Nuxt which simply start with executing node on a entry point.

```bash
node .output/server/index.mjs
```

So it turns out using Next start means that no node exit code was being produced, so everytime the app was restarting it was a gamble on if railway would pick it up because there was never a code.

The kind folks over at Railway told us they had seen this kind of thing before, and recommended to Next teams to use a single entry point for their app. They pointed us to [their docs for node sigterm events](https://docs.railway.com/guides/nodejs-sigterm).

We ended up using the first recommendation in [this comment on a github thread](https://github.com/vercel/next.js/discussions/14145#discussioncomment-25832) in order to create our entry point.

```typescript [app.mjs]
// Credit illuminist on github
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    await handle(req, res, parsedUrl)
  }).listen(process.env.PORT ?? 3000, (err) => {
    if (err) throw err
    console.log(`> Ready on ${process.env.NEXT_PUBLIC_URL ?? `http://localhost:${process.env.PORT ?? 3000}`}`)
  })
})
```

## The final pieces move into place

After shipping that new entry point, I was doing some feature development locally with inngest running in a seperate terminal.

I noticed pretty quickly the heartbeat from inngest to my local next service was really frequent, and before long I saw my first local reproduction of the next app crashing.

The output was simply:

```bash
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
 ⨯ uncaughtException:  RangeError: Maximum call stack size exceeded
 ...
```

Now that made my eyes light up like a red state on the fourth of july.

I now knew that it was related to inngest, and did not require a job to be running, we just had to hit our inngest entry route. The inngest dev poller replicated it perfectly, now I just had to find out why...

This lined up perfectly with my previously known facts too, since staging does not have any inngest jobs running unless we manually trigger them. So while production gets a steady volume of inngest hits, staging wouldn't have ran into that.

I began scrolling through my app logs locally looking for anything related to the inngest entry point, the requests themselves didn't start taking longer over time like I thought they would.

Inngest when running locally pings your app _a lot_, like an absurd amount? So all of my app logs would get constantly buried under `/api/inngest 200`, however after scrolling for a eternity, I found a instance of this message:

```bash [logs]
(node:34713) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 beforeExit listeners added to [process]. MaxListeners is 10. Use emitter.setMaxListeners() to increase limit
```

This ended up being the holy grail, _it literally says memory leak detected_. So I rushed to our production logs to query for "memory leak detected" and what would you know it was burried under the noise the whole time.

```bash [logs]
(node:1) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 31 unpipe listeners added to [y]. MaxListeners is 30. Use emitter.setMaxListeners() to increase limit
```

Locally I enabled trace warnings using `NODE_OPTIONS="--trace-warnings" node app.mjs`, turned on my local inngest server, then waited.

My patience was rewarded with the most beautiful stack trace I had ever seen.

```bash [logs]
(node:34713) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 beforeExit listeners added to [process]. MaxListeners is 10. Use emitter.setMaxListeners() to increase limit
    at genericNodeError (node:internal/errors:983:15)
    at wrappedFn (node:internal/errors:537:14)
    at _addListener (node:events:592:17)
    at process.addListener (node:events:610:10)
    at Object.setupOnce (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+node-core@10.15.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_5f3682a64ed9b19faf16b2a88f99aa06/node_modules/@sentry/node-core/build/esm/integrations/processSession.js:25:15)
    at setupIntegration (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+core@10.15.0/node_modules/@sentry/core/build/esm/integration.js:115:17)
    at eval (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+core@10.15.0/node_modules/@sentry/core/build/esm/integration.js:86:7)
    at Array.forEach (<anonymous>)
    at setupIntegrations (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+core@10.15.0/node_modules/@sentry/core/build/esm/integration.js:83:16)
    at NodeClient._setupIntegrations (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+core@10.15.0/node_modules/@sentry/core/build/esm/client.js:526:92)
    at NodeClient.init (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+core@10.15.0/node_modules/@sentry/core/build/esm/client.js:360:12)
    at _init (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+node-core@10.15.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_5f3682a64ed9b19faf16b2a88f99aa06/node_modules/@sentry/node-core/build/esm/sdk/index.js:150:10)
    at init (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+node-core@10.15.0_@opentelemetry+api@1.9.0_@opentelemetry+context-async-hooks@2_5f3682a64ed9b19faf16b2a88f99aa06/node_modules/@sentry/node-core/build/esm/sdk/index.js:96:10)
    at _init (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+node@10.15.0/node_modules/@sentry/node/build/esm/sdk/index.js:62:73)
    at Module.init (webpack-internal:///(rsc)/./node_modules/.pnpm/@sentry+node@10.15.0/node_modules/@sentry/node/build/esm/sdk/index.js:50:10)
    at eval (webpack-internal:///(rsc)/./src/inngest/client.ts:14:43)
```

It was Sentry, or more specifically our middleware for sentry, as we set it up in our Inngest client.

```typescript [client.ts]
export const inngest = new Inngest({
  id: "...",
  middleware: [sentryMiddleware()],
})
```

I removed the middleware, restarted my Next instance, and left my local Inngest instance running to ping it. Went to grab some food, and when I came back my local instance hadn't restarted.

Created a PR removing the middleware, and sent it to production.

We haven't seen a restart since.

## Things I've learned

#### Just use Node

Abstractions such as special start commands for enterprise software means you don't know what your app is doing when deploying. Take careful consideration of your deployment process when you have customers that depend on your tools.

#### Avoid AI at all costs

Many of my co-workers were quick to take my stack traces, and give them to cursor, chatgpt, claude, you name it. They all spat back the same thing: "You've got a infinite redirect loop."

When pressed for more information Cursor would always give AN answer but not THE answer, and any ask for a instruction set to reproduce the crashing instance was always met with some hallucinated use case.

These answers wasted hours of time debugging random routes with no issues, generating meaningless PRs, and creating random unit tests that mocked the entire universe to cause a error in the app.

#### Every app has gremlins

> Could probably scan every one of us and find five different doodads that look like cancer - Dr House

If you profile an entire app, or ask AI "where do these issues occur in my app" you're bound to get a million "weird looking things."

I found that the best use of your time in these cases is to follow the rabbit holes. Pick a stack trace, a error, something, and work through it.

Either you'll eventually clean all your apps tech debt, or you'll solve the issue, hopefully both.

## What was sentry doing wrong?

This is where my debugging ended, this issue had already cost us considerable engineering time it wasn't worth raising an issue to sentry, or trying to find the issue in the middleware. Maybe some day I'll get some free time to review what they were doing in the module to cause this.

For now we've simply removed the middleware, sentry monitors our app, and Inngest just hits our apps routes. Any errors we throw in functions are also stored in Inngest for review, so for now this handles our business requirements.
