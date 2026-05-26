---
title: 'Building durable chats'
date: '2026-05-20'
tags: ['ai sdk', 'bullmq', 'redis', 'pusher', 'nuxt']
description: 'What happens to your users request if the server restarts?'
sitemap:
  lastmod: 2026-05-20
ogImage:
  props:
    title: 'Building durable chats'
    description: 'What happens to your users request if the server restarts?'
---

## Background

Recently at work we shipped a workflow generator.

A user sends a prompt, we generate a workflow, and stream progress back while all of that runs.

It looks like a chat UI, however, it is not a conversation.

The user sends one message, we kick off a long job, and they watch something get built. Think [v0](https://v0.dev), not [ChatGPT](https://chatgpt.com).

A chat can get away with response calls behind http, or a streaming endpoint. However we did not have this luxury for a few reason.

1. **HTTP timeouts.** A long generation cannot live inside one request. The model call, tools, and side effects need a runner that outlasts the connection.

2. **Work tied to the user.** Due to the nature of computers, when they go down, you have to save some info for them to pickup where they left off. If your web app goes down, the user has to come back, hit your endpoint, and tell it to start back up. This is bad, never trust the user.

So we needed this frustrating thing LLMs seem to never mention, called "durability."

We also had a ticket under this project that made me laugh a little: two users open the same workflow and "see the same thing". Which is just never going to happen, because they never will. Not really. One tab closes, one person has slower internet, one misses a reconnect, one gets the tool call event three seconds later.

Realtime developers have been wrestling with "show everyone the same state" for decades. Now everybody wants it for AI, and engineers are looking at us like what the hell.

Half the industry is making LLM response calls behind plain HTTP requests.

Maybe it is generalized anxiety, but I like to think through every way the software can break before it does.

## The requirements

Because everything in life begins with a user ticket, these were the pillars of UX.

1. **Durability.** If the process restarts, the generation should automatically pick back up.

2. **Streaming.** The user should see reasoning, tool calls, and status updates as they arrive.

3. **Reconnectivity.** If the user refreshes or leaves, they should land back on the same in-progress generation, not a blank or incomplete screen.

4. **Persistence.** Completed messages and partial assistant output should be written to a non-volatile storage.

5. **Tools.** The model validates JSON, calls internal APIs, and writes workflow nodes.

7. **Authoritative server.** Use status states, pusher, and other tools to deliver critical messages. Errors, finished state, 

## Architecture

### Durable work belongs in a queue

We already run [BullMQ](https://docs.bullmq.io/) for long-lived background work.

The split looks like this:

1. **The web app** accepts the prompt, writes the user message and status to the database, enqueues a BullMQ job, and returns quickly. Standard "catch the webhook and get out" stuff.

2. **Workers** pick up the job, run the AI SDK pipeline (model calls, tools, validation), publish stream chunks to Redis, and push lifecycle events over Pusher.

3. **The client** reads tokens through the AI SDK transport with `resume` enabled, listens on a Pusher channel for status and errors, and renders with AI Elements Vue.

### AI SDK as the generation layer

We standardized on the [AI SDK](https://ai-sdk.dev/docs/introduction) for model calls, tool definitions, and UI message streams.

For our use case we needed slightly more from the docs than a basic chat route.

- [streamText](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text) with tools
- [toUIMessageStreamResponse](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#to-ui-message-stream-response) for the wire format
- [consumeSseStream](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams) to fork the SSE stream into Redis
- [convertToModelMessages](https://ai-sdk.dev/docs/reference/ai-sdk-ui/convert-to-model-messages) when rebuilding context from stored UI messages

The [Chatbot Message Persistence](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence) and [Chatbot Resume Streams](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams) docs describe the persistence model we followed.

### Redis

We already had Redis for BullMQ. The same instance can back [resumable-stream](https://github.com/vercel/resumable-stream), which stores the live UI message stream so clients can reconnect.

That covers tokens and tool parts. It does not cover everything.

### Pusher for the rest

Some state never belonged in the token stream.

- **Completing generation.** The model finished, tools ran, we are saving the workflow. The stream might already be done. Both users still need to see "finishing up" and then the canvas unlock.

- **Queue failures.** The worker threw after Redis hiccupped. BullMQ will retry, but the user should see an error toast, not a frozen half-message.

## Implementation

The whole flow: persist status and messages, enqueue, generate in a worker, stream through Redis, broadcast lifecycle on Pusher, reconnect on the client.

### Queue and worker

The interesting part is what the worker does once it picks up the job.

```typescript [server/queues/workflow-generate.ts]
import { Queue } from 'bullmq'
import { redis } from '../lib/redis'

// https://docs.bullmq.io/guide/queues
export const workflowGenerateQueue = new Queue('workflow-generate', {
  connection: redis,
})
```

```typescript [server/workers/workflow-generate.ts]
import { Worker } from 'bullmq'
import { openai } from '@ai-sdk/openai'
import { convertToModelMessages, generateId, streamText } from 'ai'
import { createResumableStreamContext } from 'resumable-stream'
import { redis } from '../lib/redis'
import { pusher } from '../lib/pusher'
import { loadChat, saveChat } from '../utils/chat-store'
import { workflowTools } from '../utils/workflow-tools'

new Worker(
  'workflow-generate',
  async (job) => {
    const chatId = job.data.chatId
    const chat = await loadChat(chatId)
    const streamId = generateId()

    await saveChat({ id: chatId, messages: chat.messages, status: 'generating', activeStreamId: null })
    await pusher.trigger(`workflow-${chatId}`, 'status', { status: 'generating' })

    try {
      const result = streamText({
        model: openai('gpt-4.1'),
        messages: await convertToModelMessages(chat.messages),
        tools: workflowTools,
      })

      const stream = result.toUIMessageStream({
        onFinish: async ({ messages }) => {
          // Stream ended — still saving artifacts; clients should stay locked
          await saveChat({ id: chatId, messages, status: 'completing', activeStreamId: null })
          await pusher.trigger(`workflow-${chatId}`, 'status', { status: 'completing' })
        },
      })

      const ctx = createResumableStreamContext({ waitUntil: (p) => void p })
      await ctx.createNewResumableStream(streamId, () => stream)

      await saveChat({ id: chatId, messages: chat.messages, status: 'generating', activeStreamId: streamId })

      await result.text

      await saveChat({ id: chatId, messages: chat.messages, status: 'idle', activeStreamId: null })
      await pusher.trigger(`workflow-${chatId}`, 'status', { status: 'idle' })
    }
    catch (err) {
      // Job failed outside the SSE wire — both tabs need this even if resume is dead
      await saveChat({ id: chatId, messages: chat.messages, status: 'failed', activeStreamId: null })
      await pusher.trigger(`workflow-${chatId}`, 'generation-failed', {
        message: err instanceof Error ? err.message : 'Generation failed',
      })
      throw err
    }
  },
  { connection: redis },
)
```

`activeStreamId` is what the resume GET handler uses. `status` is what keeps the prompt locked when resume never fires. See the [AI SDK resume streams guide](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams).

### Web routes

The API route should not run the model. Save the user message, set status to generating, clear any stale stream ID, enqueue, return.

```typescript [server/api/workflows/[id]/messages.post.ts]
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const { message } = await readBody(event)
  const chat = await loadChat(id)

  if (chat.status === 'generating' || chat.status === 'completing') {
    throw createError({ status: 409, message: 'Generation already in progress' })
  }

  await saveChat({
    id,
    messages: [...chat.messages, message],
    status: 'generating',
    activeStreamId: null,
  })

  await workflowGenerateQueue.add('workflow-generate', { chatId: id })
  return { ok: true }
})
```

The GET that loads the workflow is what makes refresh safe. Status comes from the database, not from whether the client thinks the stream connected.

```typescript [server/api/workflows/[id].get.ts]
export default defineEventHandler(async (event) => {
  return await loadChat(getRouterParam(event, 'id')!)
})
```

When `resume` is enabled, [@ai-sdk/vue](https://ai-sdk.dev/docs/ai-sdk-ui/overview) hits a GET on mount to reconnect:

```typescript [server/api/workflows/[id]/stream.get.ts]
import { createResumableStreamContext } from 'resumable-stream'

export default defineEventHandler(async (event) => {
  const chat = await loadChat(getRouterParam(event, 'id')!)

  if (!chat.activeStreamId) {
    setResponseStatus(event, 204) // nothing in flight — UI should show saved messages only
    return null
  }

  // Called automatically when Chat has resume: true — https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams
  const ctx = createResumableStreamContext({ waitUntil: (p) => event.waitUntil(p) })
  return ctx.resumeExistingStream(chat.activeStreamId)
})
```

204 when nothing is active is normal. Closing the tab is a disconnect, not a cancel. A Stop button needs its own endpoint. See [Stop an Active Resumable Stream](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams#stop-an-active-resumable-stream).

### Client: history first, then resume, then Pusher

This tripped us up early. The AI SDK is good at new messages and live streams. Hydrating an existing session from your database is your job. So is locking the UI when the database says a job is still running.

On page load: fetch the workflow row (messages **and** status), pass messages to `Chat`, disable input when status is not idle, subscribe to Pusher, then let `resume` attach to Redis.

```typescript [app/pages/workflows/[id].vue]
import { DefaultChatTransport } from 'ai'
import { Chat } from '@ai-sdk/vue'

const id = useRoute().params.id as string
const { data: workflow, refresh } = await useFetch(`/api/workflows/${id}`)

const workflowStatus = ref(workflow.value?.status ?? 'idle')
const inputLocked = computed(() =>
  workflowStatus.value === 'generating' || workflowStatus.value === 'completing',
)

// Hydrate from your DB first — resume only attaches to Redis, not your message history
const chatClient = new Chat({
  id,
  messages: workflow.value?.messages ?? [],
  resume: true,
  transport: new DefaultChatTransport({
    api: `/api/workflows/${id}/messages`,
    prepareReconnectToStreamRequest: ({ id }) => ({
      api: `/api/workflows/${id}/stream`,
    }),
  }),
})

// Lifecycle events both tabs need — https://pusher.com/docs/channels/using_channels/channels/
const pusher = usePusher()
onMounted(() => {
  const channel = pusher.subscribe(`workflow-${id}`)
  channel.bind('status', ({ status }) => {
    workflowStatus.value = status
  })
  channel.bind('generation-failed', ({ message }) => {
    toast.error(message)
    void refresh()
  })
})
```

Without that fetch, a refresh mid-generation shows a blank thread until resume catches up, or worse, an empty thread with an enabled prompt. Persist first, stream second, **lock from status**. The [message persistence guide](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence) describes the same split for messages. Status is the part they leave out.

### UI with AI Elements Vue

Generation stays on the worker. The UI only knows chat ID, messages, and whether input is locked. Wire up [AI Elements Vue](https://www.ai-elements-vue.com/examples/chatbot) around the `Chat` instance:

```vue [app/components/workflows/WorkflowChat.vue]
<script setup lang="ts">
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation'
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message'
import { PromptInput, PromptInputTextarea, PromptInputSubmit, usePromptInputProvider } from '@/components/ai-elements/prompt-input'
import type { Chat } from '@ai-sdk/vue'

const props = defineProps<{ chat: Chat; inputLocked: boolean }>()

usePromptInputProvider({
  onSubmit: async (message) => {
    if (props.inputLocked || !message.text?.trim()) return
    await props.chat.sendMessage({ text: message.text })
  },
})
</script>

<template>
  <Conversation>
    <ConversationContent>
      <Message
        v-for="message in props.chat.messages"
        :key="message.id"
        :from="message.role"
      >
        <MessageContent>
          <MessageResponse :content="message.parts[0]?.text ?? ''" />
        </MessageContent>
      </Message>
    </ConversationContent>
  </Conversation>

  <PromptInput :disabled="inputLocked">
    <PromptInputTextarea :disabled="inputLocked" />
    <PromptInputSubmit :status="props.chat.status" :disabled="inputLocked" />
  </PromptInput>
</template>
```

We render Reasoning, Tool, and Task parts where the workflow needs them. One prompt, one generation. No multi-turn input while a job is running.

### What to persist

Store full UIMessage objects (with parts), a workflow status, and an activeStreamId column. Prisma, Drizzle, whatever you already use.

```typescript [server/utils/chat-store.ts]
import type { UIMessage } from 'ai'

export type WorkflowStatus = 'idle' | 'generating' | 'completing' | 'failed'

export type StoredChat = {
  id: string
  messages: UIMessage[]
  status: WorkflowStatus // authoritative — do not infer this from chat.status alone
  activeStreamId: string | null // set while Redis has a live stream; null when idle
}
```

When someone lands on `/workflows/:id`, this row is the source of truth. If `status` is `generating` and Pusher never connects and resume returns 204, the prompt stays disabled anyway. That is the point.

## References

- [AI SDK introduction](https://ai-sdk.dev/docs/introduction)
- [AI SDK UI overview](https://ai-sdk.dev/docs/ai-sdk-ui/overview)
- [Chatbot message persistence](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-message-persistence)
- [Chatbot resume streams](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-resume-streams)
- [streamText reference](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text)
- [resumable-stream on GitHub](https://github.com/vercel/resumable-stream)
- [Pusher Channels docs](https://pusher.com/docs/channels/)
- [AI Elements Vue docs](https://www.ai-elements-vue.com/overview/introduction)
- [AI Elements Vue chatbot example](https://www.ai-elements-vue.com/examples/chatbot)
- [AI Elements Vue on GitHub](https://github.com/vuepont/ai-elements-vue)
- [BullMQ documentation](https://docs.bullmq.io/)
