# Rung 5 — BullMQ worker + Pusher

~8 min | Panes: Worker + Server + FE

## Stop here?

This is the full pattern for long-lived generation — restarts, timeouts, lifecycle events the stream never carries.

## Problem

Generation inside the request dies on deploy/restart. SSE and Redis can't deliver `completing` / `failed` when the wire is already dead.

## What we add

- **Worker:** `streamText` moves here; Redis fork; Pusher on done / error / completing
- **Server:** enqueue and return — delete inline generation (highlight as move, not rewrite)
- **FE:** Pusher subscribe for lifecycle; input still locked from DB `status`

## Slide assets

- [ ] server-diff.png (generation removed; enqueue highlighted)
- [ ] worker-diff.png (generation lands here — first Worker pane)
- [ ] fe-diff.png (Pusher bindings highlighted)

## Speaker notes



## Transition

→ final: pivot to green coding — durable systems waste less compute
