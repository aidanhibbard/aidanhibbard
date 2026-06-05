# ADR 0001: Stream ID is a pointer; Redis coordinates replay

## Status

Accepted — talk + external demo must use this language.

## Context

Audience will ask: *"If we store `activeStreamId` in the DB, why pipe through Redis?"*

## Decision

Use three-layer language in slides and Q&A:

| Layer | Role |
|-------|------|
| **DB `activeStreamId`** | Pointer: *which* live generation to join. Not tokens. Cleared on finish/failure. |
| **Redis (`resumable-stream`)** | Cross-process bus: web `GET /stream` subscribes to the worker's live producer. Not durable chunk storage. |
| **Worker memory** | Actual token buffer while generation runs. Lost on worker crash. |

**Rebuttal:** Stream ID is the ticket number. Redis is the intercom between processes. The tape is in the worker's RAM.

## Consequences

- Do not say "Redis stores the stream" — say **coordinates resumable SSE** or **fans out the live producer**.
- Redis resume survives **refresh** and **client disconnect**, not **worker restart** (that's BullMQ + DB + Pusher).
- `activeStreamId` is introduced at **rung 4** with Redis — not rung 3.

## References

- [AI SDK resume streams](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams)
- [vercel/resumable-stream](https://github.com/vercel/resumable-stream)
