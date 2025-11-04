---
title: 'Trying out Nitro V3'
date: '2025-10-31'
tags: ['nitro', 'vite', 'vue', 'react']
description: 'Creating lightweight servers to back SPA frontends, using a Nuxt like DX.'
---

# Nitro v3 Playground

Welcome to a stress-test of the content pipeline. This page intentionally includes many Markdown and MDC features to exercise all `Prose*` components. Use it as a sandbox while writing the real article later. For reference material, see the Nitro v3 docs: [Nitro v3 docs](https://v3.nitro.build/).

> “Nitro is what you reach for when you want a tiny server that feels first-class in a Vite world.” — A pretend developer
>
> “I love the `nitro()` Vite plugin. Drop-in, no drama.” — Another imaginary engineer

`inline code` can appear anywhere. For example, call `nitro()` in `vite.config.ts`, create routes in `routes/hello.ts`, and ship it.

---

## Quick start (H2)

Add the Vite plugin and a basic preset:

```typescript [vite.config.ts] {1,5-11}
import { defineConfig } from 'vite'
import { nitro } from 'nitro/vite'

export default defineConfig({
  plugins: [
    nitro()
  ],
  nitro: {
    preset: 'standard'
  }
})
```

### Server routes (H3)

Minimal file-based route:

```typescript [routes/hello.ts] filename="routes/hello.ts"
import { defineHandler } from 'nitro/h3'

export default defineHandler(({ req }) => {
  return { api: 'works!' }
})
```

#### Using H3 (H4)

```typescript [server.ts] filename="server.ts" {1,5}
import { H3 } from 'h3'

const app = new H3()

app.get('/', () => '⚡️ Hello from H3!')

export default app
```

##### Using Hono (H5)

```typescript [server.ts] filename="server.ts"
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('🔥 Hello from Hono!'))

export default app
```

###### Using Elysia (H6)

```typescript [server.ts] filename="server.ts"
import { Elysia } from 'elysia'

const app = new Elysia()

app.get('/', (c) => '🦊 Hello from Elysia!')

export default app
```

---

## Lists of all kinds

Regular unordered list:

- Install dependencies
- Configure `vite.config.ts`
- Start dev server
  - Nested item one
    - Nested item two

Ordered list with nesting:

1. Scaffold project
2. Add Nitro
   1. Add plugin
   2. Create `routes/`
3. Deploy

Task list (MD flavors):

- [x] Create project
- [x] Add a route
- [ ] Add middleware
- [ ] Deploy to production

---

## Emphasis, links, and images

This sentence has both _emphasis_ and **strong emphasis**, along with `inline code` and a reference to the docs: [Nitro v3 docs](https://v3.nitro.build/).

An image (may be a placeholder in your project):

![Nitro logo placeholder](/images/nitro-logo.png "Nitro logo")

---

## Tables

| Feature     | Status   | Notes                      |
|-------------|----------|----------------------------|
| Vite plugin | Stable   | `nitro()` in Vite config   |
| FS routing  | Stable   | `routes/` auto-registered  |
| HMR (server)| Fast     | Great DX                   |

---

## Larger code samples

```bash [Terminal]
pnpm add -D nitro nitro/vite
```

```typescript [server.ts] filename="server.ts" class="rounded-lg" {2,6}
export default {
  async fetch(req: Request): Promise<Response> {
    return new Response(`Hello world! (${req.url})`)
  },
}
```


```typescript
const test = 'test'
```

```typescript [dev-notes.ts]
// Demonstrate multi-line highlighted code with faux logic
type Framework = 'h3' | 'hono' | 'elysia'

function createGreeting(framework: Framework): string {
  if (framework === 'h3') return '⚡️ Hello from H3!'
  if (framework === 'hono') return '🔥 Hello from Hono!'
  return '🦊 Hello from Elysia!'
}

console.log(createGreeting('h3'))
```

> “Ship anywhere without vendor lock-in.” — Imaginary SRE

---

## Edge cases to try

1. Very long paragraph to test wrapping and readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

2. Inline code mixed with punctuation: use `defineHandler()`, `useRuntimeConfig()`, `app.get('/')`, and `nitro()`.

3. Multiple blockquotes:

> “Performance is a feature.” — A random performance enthusiast
>
> “Minimal design. Maximum versatility.” — A fictitious product manager

4. Horizontal rule below:

---

5. Deeply nested lists:
   - Level 1
     - Level 2
       - Level 3
         - Level 4

6. Link variants: [Nitro homepage](https://v3.nitro.build/) and a relative link to [`/about`](/about).

---

Happy experimenting! This page is a playground by design. Feel free to add, remove, or mutate anything while you explore Nitro v3.

