# Rung 1 — HTTP call

~4 min | Panes: Server + FE

## Stop here?

Fine for short, synchronous work where the full response arrives in one shot — a text wall, not a conversation. Streaming and DB persistence are possible here but unnecessary.

## Problem

You need an answer back before the request times out. One shot, one response.

## What we add

- **Server:** `POST` handler — accept prompt, call model, return JSON
- **FE:** submit prompt, render response

## Slide assets

- [ ] server-diff.png (baseline — full file or first frame)
- [ ] fe-diff.png (baseline)

## Speaker notes

Open the growth phases here — not a conversation UI:

> This isn't a conversation — text walls are being spat at you.

Pure HTTP: one request, one blob back. Fine for this shape of problem.

Rhetorical beat before moving on (rung 1 only):

> You *could* implement streaming and DB persistence at this phase — but why would you?

Later rungs use fresh transitions — not the same tease each time.

## Transition

→ rung 02: when the text wall takes too long to arrive — streaming