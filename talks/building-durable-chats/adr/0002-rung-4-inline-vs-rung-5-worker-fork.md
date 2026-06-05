# ADR 0002: Rung 4 inline fork ≠ rung 5 worker fork

## Status

Accepted — external demo must show two different AI SDK + resumable-stream patterns.

## Context

Blog lists `consumeSseStream` but worker snippet uses `createNewResumableStream` on `toUIMessageStream()` directly. Conflating them breaks rung 4 ("generation still in web process").

## Decision

| Phase | Generation location | Resumable pattern |
|-------|--------------------|-------------------|
| **Rung 4** | Server route (inline) | `toUIMessageStreamResponse` + `consumeSseStream` → fork SSE into `createNewResumableStream`; save `activeStreamId` |
| **Rung 5** | BullMQ worker | `toUIMessageStream()` → `createNewResumableStream` directly; POST returns `{ ok: true }` only |

Rung 5 is a **wire protocol change**: client must attach via `GET /stream` (resume), not SSE from POST body.

## Consequences

- Rung 4 slides: `event.waitUntil` on the web route.
- Rung 5 slides: worker `waitUntil`; FE diff must show transport change, not only Worker pane.
- First send on same page at rung 5: after POST, client must reconnect when `activeStreamId` is set (`resume` mount-only is insufficient — see ADR 0003).
