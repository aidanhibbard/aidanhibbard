# Building durable chats (talk)

Glossary for the Deschutes Tech Guild talk adapted from the blog post *Building durable chats*.

## Talk

A 30–40 minute presentation at Deschutes Tech Guild (Embark, Bend). **Title slide: Building Agentic Pipelines for Long-Lived Generation** (matches Meetup listing). Humorous opening (sprites, vibe-coder hook), credibility intro, five **growth phases** (not a prescriptive checklist), green-coding close, Q&A buffer.

## Five-rung ladder

Progressive architecture the audience climbs, one rung at a time:

1. **HTTP call** — request/response; fine for short work (e.g. naming a project from a small prompt).
2. **HTTP + streaming** — tokens arrive over SSE; still tied to the request lifecycle.
3. **SSE + DB** — messages and `status` persisted; fetch on first land; polling for in-flight status. No `activeStreamId` yet.
4. **SSE + DB + Redis reconnect** — `activeStreamId` + `resumable-stream`; inline route uses `consumeSseStream`; refresh reattaches to live tokens.
5. **BullMQ worker + Redis + Pusher** — generation leaves HTTP; POST returns quickly; worker owns stream; Pusher for lifecycle off the SSE wire.

## Pusher

Pub/sub channel used **only at rung 5** to push lifecycle states: `idle`, `completing`, `generating`, `generation-failed`. Not for token streaming; not introduced before the worker. (Not `done` — code uses `idle`.)

## Growth phases (not a mandate)

Each rung is **what you should add when that need appears** — not “you must build all five.” Server and FE patterns expand from rung 3 onward; worker joins at rung 5 and the same incremental pattern applies across all three panes.

| Rung | Server + FE growth | Worker |
|------|-------------------|--------|
| 3 | DB: fetch on first land, lock from `status`, polling | — |
| 4 | + Redis resume on FE; resume handler on server | — |
| 5 | + Pusher subscribe on FE; enqueue-only on server (POST no longer streams) | Generation moves here; Pusher for lifecycle; same Redis instance also backs BullMQ |

No separate “coda” section — each phase extends the same files on slide.

## Sprites (opening)

Brief (~2–3 min) aside on atmospheric sprites (upper-atmosphere electrical phenomena) before the technical hook. Not related to game sprites or implementation.

## Slide code strategy

Slides only — no live demo. Pre-authored code in an **external repo**; slides show **git-diff-style growth**, not separate files per phase.

- **Same files throughout rungs 1–4:** one **Server** endpoint and one **FE component** — only the changed lines differ each slide (additions/highlights, not a full rewrite).
- **Rung 5:** introduce **Worker** pane; Server sheds generation, Worker gains it. All three files continue the same diff pattern rung to rung.

Each rung: what broke → what we added → highlighted diff. Not a prescription to implement every layer.

**Diff visuals:** Pre-rendered assets only — code image generators, or screenshots from Shiki-based tools / online git-diff viewers (not live IDE). Same Server + FE files; highlight additions per phase; rung 5 adds Worker pane the same way.

## Technical Q&A (prepare)

See `adr/` for decisions. Key rebuttals:

- **Stream ID vs Redis:** ID is DB pointer; Redis coordinates cross-process replay; buffer is in worker RAM. ADR 0001.
- **Redis ≠ restart durability:** BullMQ + DB survive deploy; Redis resume survives refresh while producer lives.
- **Why Pusher if Redis?** Tokens/tool parts via Redis SSE; `completing` / `generation-failed` happen off-wire or after stream ends.
- **Disconnect ≠ cancel:** Need explicit stop endpoint when `resume: true`.
- **Rung 4 vs 5 fork pattern:** ADR 0002. **First send at rung 5:** ADR 0003.

## Outline structure

Talk script lives under `talks/building-durable-chats/sections/`:

```
talks/building-durable-chats/
├── CONTEXT.md
├── sections/
│   ├── intro.md
│   ├── credibility.md
│   ├── rungs/
│   │   ├── 01-http.md
│   │   ├── 02-stream.md
│   │   ├── 03-db-poll.md
│   │   ├── 04-redis-resume.md
│   │   └── 05-worker-pusher.md
│   └── final.md
└── adr/
```

| Section | File | Contents |
|---------|------|----------|
| Intro | `sections/intro.md` | Two beats in one file: (1) sprites ~2–3 min, (2) humor hook — engineers vs vibe coders, shimmer fail slide |
| Credibility | `sections/credibility.md` | Name, Niche, enterprise realtime scale |
| Rungs | `sections/rungs/` | One file per growth phase; shared template (see below) |
| Final | `sections/final.md` | Green coding practices, O'Reilly books, green coding initiatives — not client coda or homework links |

### Rung file template

Each `sections/rungs/*.md` uses the same headings:

- **Stop here?** — who can stop at this phase
- **Problem** — what breaks without it
- **What we add** — server / FE / worker bullets
- **Slide assets** — checklist of diff screenshots
- **Speaker notes**
- **Transition** — one line into the next rung (unique each time; no repeated rhetorical device across rungs)
