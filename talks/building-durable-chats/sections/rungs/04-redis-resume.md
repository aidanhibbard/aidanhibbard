# Rung 4 — Redis reconnect

~4 min | Panes: Server + FE

## Stop here?

You need live token resume after refresh, but generation still fits in the web process.

## Problem

SSE dies on disconnect. DB has history, but the in-flight token stream is gone.

## What we add

- **Server:** `stream.get` resume handler; inline route: `toUIMessageStreamResponse` + `consumeSseStream` → `createNewResumableStream`; save `activeStreamId`; 204 when null
- **FE:** hydrate from DB first; `resume: true` + `prepareReconnectToStreamRequest`; explicit stop endpoint for cancel

Redis **coordinates** replay — does not durably store every token. Same Redis instance later backs BullMQ at rung 5.

## Slide assets

- [ ] server-diff.png
- [ ] fe-diff.png

## Speaker notes



## Transition


