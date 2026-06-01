# Rung 2 — HTTP + streaming

~4 min | Panes: Server + FE

## Stop here?

Fine when generation fits inside one request lifetime and you don't need durability across refresh or restart.

## Problem

Long output blocks the UI waiting for the full response; user sees nothing until the end.

## What we add

- **Server:** `streamText` (or equivalent) — SSE back on the same route
- **FE:** consume stream; render tokens as they arrive

## Slide assets

- [ ] server-diff.png (streaming additions highlighted)
- [ ] fe-diff.png (stream consumer highlighted)

## Speaker notes



## Transition

→ rung 03: streaming keeps the request open — refresh and you're on a new page with nothing persisted