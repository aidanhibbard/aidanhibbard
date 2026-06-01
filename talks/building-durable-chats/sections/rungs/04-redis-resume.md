# Rung 4 — Redis reconnect

~4 min | Panes: Server + FE

## Stop here?

You need live token resume after refresh, but generation still fits in the web process.

## Problem

SSE dies on disconnect. DB has history, but the in-flight token stream is gone.

## What we add

- **Server:** `stream.get` resume handler; fork SSE into Redis (`activeStreamId`)
- **FE:** `resume: true` on transport — hydrate from DB first, then reattach

## Slide assets

- [ ] server-diff.png
- [ ] fe-diff.png

## Speaker notes



## Transition


