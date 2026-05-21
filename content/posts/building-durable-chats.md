---
title: 'Building durable chats'
date: '2026-05-20'
tags: ['ai sdk', 'bullmq', 'redis', 'nuxt']
description: 'What happens to your users request if the server restarts?'
sitemap:
  lastmod: 2026-05-20
ogImage:
  props:
    title: 'Building durable chats'
    description: 'What happens to your users request if the server restarts?'
---

## Background

Recently at work we shipped a workflow generator. A user sends a prompt, we generate a workflow, validate the output, call tools to store it, and stream progress back while all of that runs.

It looks like a chat UI, however, it is not a conversation.

There is no back-and-forth thread where the model keeps context across turns in the way a support bot would. The user sends one message, we kick off a long job, and they watch something get built. Think [v0](https://v0.dev), not [ChatGPT](https://chatgpt.com).

That distinction matters for architecture. A chat demo can get away with a single HTTP request and a SSE stream. A workflow generator cannot. The generation can run for minutes. The user can refresh. A deploy can roll while they are still watching the canvas fill in. If you treat this like a normal chat route handler, you will lose work, lose streams, and lose users.

This post is how we wired it up with the [Vercel AI SDK](https://ai-sdk.dev/docs/introduction), [AI SDK for Vue](https://ai-sdk.dev/docs/getting-started/nuxt) on the frontend, [AI Elements Vue](https://www.ai-elements-vue.com/overview/introduction) for the UI, [nuxt-processor](https://aidanhibbard.github.io/nuxt-processor/) for BullMQ workers, and [resumable-stream](https://github.com/vercel/resumable-stream) over Redis.

## The requirements

We had a short list of things that were not negotiable.

1. **Durability.** If the web process restarts, the generation should keep running.

2. **Streaming.** The user should see tokens, tool calls, and status updates as they arrive.

3. **Reconnectivity.** If the user refreshes or their tab sleeps, they should land back on the same in-progress generation, not a blank screen.

4. **Persistence.** Completed messages and partial assistant output should survive reloads.

5. **Tools.** The model validates JSON, calls internal APIs, and writes workflow nodes. That is not a single `streamText` call you fire and forget in a route handler.

## Architecture

### Durable work belongs in a queue

We already run [BullMQ](https://docs.bullmq.io/) for long-lived background work.

I also maintain [nuxt-processor](https://github.com/aidanhibbard/nuxt-processor), a Nuxt module that runs BullMQ workers in a dedicated Node process, separate from the Nitro server. That was the obvious fit. The [module docs](https://aidanhibbard.github.io/nuxt-processor/) cover install, Redis config, and the worker entry point.

The split looks like this:

1. **Nuxt (Nitro)** accepts the prompt, writes the user message to the database, enqueues a job, and returns quickly.

2. **Workers** pick up the job, run the AI SDK pipeline (model calls, tools, validation), and publish stream chunks to Redis.

3. **The browser** reads the stream through the AI SDK UI transport, with resume enabled, and renders with AI Elements Vue.

### AI SDK as the generation layer

We standardized on the [AI SDK](https://ai-sdk.dev/docs/introduction) for model calls, tool definitions, and UI message streams. The [Nuxt getting started guide](https://ai-sdk.dev/docs/getting-started/nuxt) shows the basic `streamText` + `@ai-sdk/vue` setup.

For our use case we needed more than the default chat route:

- [`streamText`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) with tools
- [`toUIMessageStreamResponse`](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#to-ui-message-stream-response) for the wire format
- [`consumeSseStream`](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams) to fork the SSE stream into Redis
- [`convertToModelMessages`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/convert-to-model-messages) when rebuilding context from stored UI messages

The [Chatbot Message Persistence](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence) and [Chatbot Resume Streams](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams) docs describe the persistence model we followed.

### Redis

We already had Redis for BullMQ through nuxt-processor. The same instance also backs [resumable-stream](https://www.npmjs.com/package/resumable-stream), which stores the live UI message stream so clients can reconnect.

### Frontend: AI SDK UI + AI Elements Vue

[@ai-sdk/vue](https://ai-sdk.dev/docs/ai-sdk-ui/overview) gives you the `Chat` class and transport layer. [AI Elements Vue](https://www.ai-elements-vue.com/overview/introduction) gives you the actual UI: [`Conversation`](https://www.ai-elements-vue.com/components/chatbot/conversation), [`Message`](https://www.ai-elements-vue.com/components/chatbot/message), [`PromptInput`](https://www.ai-elements-vue.com/components/chatbot/prompt-input), [`Reasoning`](https://www.ai-elements-vue.com/components/chatbot/reasoning), [`Tool`](https://www.ai-elements-vue.com/components/chatbot/tool), and the rest.

The [chatbot example](https://www.ai-elements-vue.com/examples/chatbot) is the best starting point. Install with:

```bash
npx ai-elements-vue@latest
pnpm add ai @ai-sdk/vue zod resumable-stream
```

We kept generation logic on the worker and rendering logic in Vue. The UI does not know about BullMQ. It only knows about chat IDs, messages, and whether a stream is still active.

## Implementation

The whole flow in one pass: persist, enqueue, generate in a worker, stream through Redis, reconnect on the client.

### Queue and worker

[nuxt-processor](https://aidanhibbard.github.io/nuxt-processor/) queue and worker files are small. The interesting part is what the worker does once it picks up the job.

```typescript
// server/queues/workflow-generate.ts
import { defineQueue } from '#processor'

export default defineQueue({ name: 'workflow-generate' })
```

```typescript
// server/workers/workflow-generate.ts
import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, generateId, streamText } from 'ai'
import { createResumableStreamContext } from 'resumable-stream'
import { defineWorker } from '#processor'

export default defineWorker({
  name: 'workflow-generate',
  async processor(job) {
    const chat = await loadChat(job.data.chatId)
    const streamId = generateId()

    const result = streamText({
      model: openai('gpt-4.1'),
      messages: await convertToModelMessages(chat.messages),
      tools: workflowTools,
    })

    const stream = result.toUIMessageStream({
      onFinish: ({ messages }) => saveChat({ ...chat, messages, activeStreamId: null }),
    })

    await createResumableStreamContext(/* ... */)
      .createNewResumableStream(streamId, () => stream)

    await saveChat({ ...chat, activeStreamId: streamId })
  },
})
```

The job runs outside Nitro, so deploys do not kill in-flight generations. `activeStreamId` in your database is what the resume GET handler uses to find the Redis stream. See the [AI SDK resume streams guide](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams).

Run workers in a second terminal with `npx nuxt-processor dev`. [Bull Board](https://aidanhibbard.github.io/nuxt-processor/bull-board) helps locally.

### Web routes

The API route should not run the model. Save the user message, clear any stale stream ID, enqueue, return.

```typescript
// POST /api/workflows/:id/messages
await saveChat({ id, messages: [...chat.messages, message], activeStreamId: null })
await workflowGenerateQueue.add('workflow-generate', { chatId: id })
```

When `resume` is enabled, [@ai-sdk/vue](https://ai-sdk.dev/docs/ai-sdk-ui/overview) hits a GET on mount to reconnect:

```typescript
// GET /api/workflows/:id/stream
import { createResumableStreamContext } from 'resumable-stream'

const chat = await loadChat(id)
if (!chat.activeStreamId) return 204

return createResumableStreamContext(/* ... */)
  .resumeExistingStream(chat.activeStreamId)
```

204 when nothing is active is normal. Closing the tab is a disconnect, not a cancel. A Stop button needs its own endpoint. See [Stop an Active Resumable Stream](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams#stop-an-active-resumable-stream).

### Client: history first, then resume

This tripped us up early. The AI SDK is good at new messages and live streams. Hydrating an existing session from your database is your job.

On page load: fetch persisted messages, pass them to `Chat`, then let `resume` attach to Redis.

```typescript
import { DefaultChatTransport } from 'ai'
import { Chat } from '@ai-sdk/vue'

const { data: chat } = await useFetch(`/api/workflows/${id}`)

const chatClient = new Chat({
  id,
  messages: chat.messages,
  resume: true,
  transport: new DefaultChatTransport({
    api: `/api/workflows/${id}/messages`,
    prepareReconnectToStreamRequest: ({ id }) => ({ api: `/api/workflows/${id}/stream` }),
  }),
})
```

Without that fetch, a refresh mid-generation shows a blank thread until resume catches up. Persist first, stream second. The [message persistence guide](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence) describes the same split.

### UI with AI Elements Vue

Generation stays on the worker. The UI only knows chat ID, messages, and stream status. Wire up [AI Elements Vue](https://www.ai-elements-vue.com/examples/chatbot) around the `Chat` instance:

```vue
<script setup lang="ts">
import { Chat } from '@ai-sdk/vue'
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation'
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message'
import { PromptInput, PromptInputTextarea, PromptInputSubmit } from '@/components/ai-elements/prompt-input'

const chat = new Chat({ /* ... */ })
</script>

<template>
  <Conversation>
    <ConversationContent>
      <Message v-for="message in chat.messages" :key="message.id" :from="message.role">
        <MessageContent>
          <MessageResponse :content="message.parts[0].text" />
        </MessageContent>
      </Message>
    </ConversationContent>
  </Conversation>

  <PromptInput>
    <PromptInputTextarea />
    <PromptInputSubmit :status="chat.status" />
  </PromptInput>
</template>
```

We render `Reasoning`, `Tool`, and `Task` parts where the workflow needs them. One prompt, one generation. No multi-turn input while a job is running.

### What to persist

Store full `UIMessage` objects (with parts), plus an `activeStreamId` column. Prisma, Drizzle, whatever you already use. The AI SDK docs call this out in [Reading UIMessage Streams](https://ai-sdk.dev/docs/ai-sdk-ui/reading-ui-message-streams).

## What we got wrong the first time

**Running the model in the API route.** It worked in demos. It failed in production the first time someone kicked off a heavy workflow and we deployed.

**Treating refresh as abort.** Resumable streams are disconnect-tolerant by design. If your route cleanup calls stop logic, you will fight the resume system. Read the [troubleshooting note on abort vs disconnect](https://ai-sdk.dev/docs/troubleshooting/abort-breaks-resumable-streams).

**Skipping the initial history fetch.** The AI SDK fires new messages well. Catching up existing state is your job.

**Sharing one Redis without namespacing.** BullMQ keys and resumable-stream keys can coexist, but use separate logical databases or key prefixes if you run multiple environments on one instance.

**Forgetting worker restarts.** Run workers through [nuxt-processor dev](https://aidanhibbard.github.io/nuxt-processor/getting-started#cli) in development with file watching. In production, run `.output/server/workers/index.mjs` as its own service with the same `NUXT_REDIS_*` vars as the app.

## How it feels now

A user submits a prompt. We persist it, enqueue `workflow-generate`, and the worker owns the rest. They see streaming output through AI Elements Vue. If they refresh, we load messages from the database, `resume` reconnects to Redis, and the canvas keeps filling in.

If the web server restarts, the worker keeps going. If the worker restarts, BullMQ retries the job. If the user closes the laptop and opens it ten minutes later, they see the last persisted state and pick up the stream if it is still active.

That is durable enough for something that looks like chat but behaves like a job.

## References

- [AI SDK introduction](https://ai-sdk.dev/docs/introduction)
- [AI SDK Nuxt getting started](https://ai-sdk.dev/docs/getting-started/nuxt)
- [AI SDK UI overview](https://ai-sdk.dev/docs/ai-sdk-ui/overview)
- [Chatbot message persistence](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence)
- [Chatbot resume streams](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams)
- [streamText reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text)
- [resumable-stream on GitHub](https://github.com/vercel/resumable-stream)
- [resumable-stream on npm](https://www.npmjs.com/package/resumable-stream)
- [@ai-sdk/vue on npm](https://www.npmjs.com/package/@ai-sdk/vue)
- [AI Elements Vue docs](https://www.ai-elements-vue.com/overview/introduction)
- [AI Elements Vue chatbot example](https://www.ai-elements-vue.com/examples/chatbot)
- [AI Elements Vue on GitHub](https://github.com/vuepont/ai-elements-vue)
- [nuxt-processor docs](https://aidanhibbard.github.io/nuxt-processor/)
- [nuxt-processor on GitHub](https://github.com/aidanhibbard/nuxt-processor)
- [BullMQ documentation](https://docs.bullmq.io/)
- [Bull Board H3 adapter discussion](https://github.com/felixmosh/bull-board/issues/669#issuecomment-2057544256)
