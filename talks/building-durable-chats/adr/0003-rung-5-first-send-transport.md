# ADR 0003: Rung 5 first-send must explicitly resume

## Status

Proposed — must be resolved in external demo repo before rung 5 slides are final.

## Context

AI SDK `resume: true` runs GET `/stream` on **mount**. At rung 5, POST enqueues and returns JSON — no SSE body. User stays on the same page after first send.

## Options

1. **After POST success:** poll/read `activeStreamId` from GET workflow (or POST response), then call client `resumeStream()` / equivalent when non-null.
2. **Custom `DefaultChatTransport`:** parallel POST enqueue + GET resume (Upstash/chatbot-resume-streams pattern).
3. **Pusher `generating` + refetch:** refetch workflow row, then trigger resume when `activeStreamId` appears.

## Decision

TBD in external repo. Slides must show whichever pattern is implemented — blog FE snippet alone is incomplete for rung 5.

## Consequences

Hardest rung-5 Q&A question if unresolved. Do not copy blog client verbatim without this beat.
