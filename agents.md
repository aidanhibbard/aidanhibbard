## Nuxt Agent Rules

Project-agnostic Vue 3 + Nuxt best practices for AI-assisted coding.

**Requirement:** Every rule includes a documentation link for the underlying behavior or API.

## Development Instructions

### App

- **Use composables or stores when possible to extract component logic**
  - Docs: [Vue: Composables](https://vuejs.org/guide/reusability/composables.html), [Pinia](https://pinia.vuejs.org/)

- **put script blocks at the top, templates in the middle, styles at the bottom.**
  - Docs: [Vue: Single-File Components](https://vuejs.org/guide/scaling-up/sfc.html)

- **script sections should use "state" such as**
  - Example:

```ts
const state = reactive<T>({})
```

  - **To avoid having lots of refs**
  - Docs: [Vue: `reactive()`](https://vuejs.org/api/reactivity-core.html#reactive), [Vue: Reactivity Fundamentals](https://vuejs.org/guide/essentials/reactivity-fundamentals.html)

- **and script blocks should be laid out as:**
  - Imports
  - Types
  - State / composables/ stores
  - methods
  - watchers
  - onMounted
  - onUnmounted
  - Keep things neatly grouped _as they would run logically_
  - Docs: [Vue Style Guide](https://vuejs.org/style-guide/), [Vue: Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)

- **Components should be auto-importable through nuxt such as <NavigationAppSidebar /> which would be /components/navigation/AppSidebar.vue**
  - Docs: [Nuxt: `components/` (auto-import)](https://nuxt.com/docs/guide/directory-structure/components)
  - Note: `<NavigationAppSidebar />` is just an example; follow Nuxt component auto-import naming conventions consistently.

- **If there is a server and types, methods, or utilities will be shared between them and the client used the shared/ directory**
  - Docs: [Nuxt: `server/` directory (server-only boundary)](https://nuxt.com/docs/guide/directory-structure/server)
  - Note: `shared/` is a conventional name; the key is keeping shared code safe to run on both server and client.

- **If available always verify work with linters, and type checking**
  - Docs: [ESLint](https://eslint.org/docs/latest/), [TypeScript documentation](https://www.typescriptlang.org/docs/)

- **If the project uses shadcn dont touch generated code unless explicitly told to**
  - Docs: [shadcn-vue](https://www.shadcn-vue.com/)

### Vue (Composition API + SFC) best practices

- **Prefer `<script setup>` or `<script setup lang="...">` for new Vue SFCs**
  - Docs: [Vue: `<script setup>`](https://vuejs.org/api/sfc-script-setup.html)

- **Use `const` rather than `function` declarations for locally-scoped helpers in script blocks (avoid hoisting surprises; keep dependency order explicit)**
  - Docs: [MDN: Hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting), [MDN: `const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [MDN: `function` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)

- **Prefer `computed()` for derived state; use `watch()` / `watchEffect()` for side-effects**
  - Docs: [Vue: Computed](https://vuejs.org/guide/essentials/computed.html), [Vue: Watchers](https://vuejs.org/guide/essentials/watchers.html)

- **Never mutate props directly; use emits (or `v-model`) instead**
  - Docs: [Vue: One-way data flow](https://vuejs.org/guide/components/props.html#one-way-data-flow)

- **Avoid direct DOM manipulation; use template refs + lifecycle hooks**
  - Docs: [Vue: Template refs](https://vuejs.org/guide/essentials/template-refs.html), [Vue: Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)

- **Follow the Vue Style Guide for naming and template conventions**
  - Docs: [Vue Style Guide](https://vuejs.org/style-guide/)

### Nuxt best practices (SSR-safe, auto-imports, data fetching)

- **Avoid importing things Nuxt auto-imports; only add manual imports when something is not auto-imported (or for type-only imports)**
  - Docs: [Nuxt: Auto Imports](https://nuxt.com/docs/guide/concepts/auto-imports)

- **Avoid `window` / `document` usage in universal code; prefer Nuxt/Vue abstractions (or guard via `<ClientOnly>` / lifecycle hooks)**
  - Docs: [Nuxt: `<ClientOnly>`](https://nuxt.com/docs/api/components/client-only), [Vue: Lifecycle Hooks](https://vuejs.org/api/composition-api-lifecycle.html)

- **Prefer `navigateTo()` and `<NuxtLink>` over `window.location` / manual URL manipulation**
  - Docs: [Nuxt: `navigateTo`](https://nuxt.com/docs/api/utils/navigate-to), [Nuxt: `<NuxtLink>`](https://nuxt.com/docs/api/components/nuxt-link)

- **Prefer `useFetch()` / `useAsyncData()` over raw `fetch()` in components (SSR-aware, request dedupe, caching patterns)**
  - Docs: [Nuxt: `useFetch`](https://nuxt.com/docs/api/composables/use-fetch), [Nuxt: `useAsyncData`](https://nuxt.com/docs/api/composables/use-async-data)

- **Prefer `useCookie()` over `localStorage` for universal persistence**
  - Docs: [Nuxt: `useCookie`](https://nuxt.com/docs/api/composables/use-cookie)

- **Prefer `useHead()` / `useSeoMeta()` over direct `<head>` or DOM manipulation**
  - Docs: [Nuxt: `useHead`](https://nuxt.com/docs/api/composables/use-head), [Nuxt: `useSeoMeta`](https://nuxt.com/docs/api/composables/use-seo-meta)

- **Use `useRuntimeConfig()` for environment-specific configuration (never hardcode secrets)**
  - Docs: [Nuxt: `useRuntimeConfig`](https://nuxt.com/docs/api/composables/use-runtime-config)

- **Use `useState()` for shared/universal state instead of module-level singletons**
  - Docs: [Nuxt: `useState`](https://nuxt.com/docs/api/composables/use-state)

- **Use plugins for app-level injections/side-effects; avoid doing side-effects at module import time**
  - Docs: [Nuxt: `plugins/` directory](https://nuxt.com/docs/guide/directory-structure/plugins)

## Server

- **Always version endpoints and follow rest best practices**
  - Docs: [Google AIP-181: Versioning](https://google.aip.dev/181), [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), [MDN: HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

- **post /server/api/v1-2-3.../users for instance would create a user**
  - Docs: [Nuxt: `server/` directory](https://nuxt.com/docs/guide/directory-structure/server), [Nitro: Routing](https://nitro.unjs.io/guide/routing), [MDN: HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
  - Note: Treat the path as a versioned API example; follow Nitro/Nuxt routing conventions for the actual route mapping.

- **Use file-based routing conventions for server handlers and separate methods cleanly**
  - Docs: [Nitro: Routing](https://nitro.unjs.io/guide/routing), [h3 (request handlers)](https://h3.unjs.io/guide/)
