# Rung 3 — DB + fetch on land + polling

~4 min | Panes: Server + FE

## Stop here?

You need refresh-safe history and authoritative UI lock state, but reconnect and out-of-request generation aren't problems yet.

## Problem

Streaming fixed the wait, but state still lives in the open request. Refresh kills the client connection — the HTTP call may still be running server-side, but the new page has **no history**, no stream attachment, and no authoritative “generating” flag. User lands on a blank thread (or a spinner with no source of truth). DB gives you something to render and lock against on first land.

## What we add

- **Server:** persist messages + `status`; still inline generation — no `activeStreamId` yet
- **FE:** fetch row on first land; lock input from DB `status`; poll `status` (and messages if incrementally persisted)

Polling is interim for multi-tab status sync until Pusher at rung 5. Refresh still loses **live partial tokens** until rung 4.

## Slide assets

- [ ] server-diff.png
- [ ] fe-diff.png

## Speaker notes



## Transition


