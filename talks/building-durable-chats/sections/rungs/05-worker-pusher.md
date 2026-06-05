# Rung 5 — BullMQ worker + Pusher

~8 min | Panes: Worker + Server + FE

## Stop here?

This is the full pattern for long-lived generation — restarts, timeouts, lifecycle events the stream never carries.

## Problem

Generation inside the request dies on deploy/restart. SSE and Redis can't deliver `completing` / `failed` when the wire is already dead.

## What we add

- **Worker:** `streamText` → `toUIMessageStream()` → `createNewResumableStream` (not `consumeSseStream` — different from rung 4)
- **Server:** enqueue and return `{ ok: true }` — POST no longer streams; delete inline generation
- **FE:** Pusher subscribe; after POST must explicitly resume when `activeStreamId` is set (see ADR 0003)

During `completing`, `activeStreamId` is null — resume returns 204; UI stays locked via DB `status` + Pusher.

## Slide assets

- [ ] server-diff.png (generation removed; enqueue highlighted)
- [ ] worker-diff.png (generation lands here — first Worker pane)
- [ ] fe-diff.png (Pusher bindings highlighted)

## Speaker notes



## Transition

→ final: pivot to green coding — durable systems waste less compute
