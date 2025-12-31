# Nuxt Agent Rules

## Quick context / TL;DR

- Prefer **Nuxt/Vue primitives** (`navigateTo`, `useRoute`, `useFetch`, `useAsyncData`, `useSeoMeta`, etc.) over direct `window`/`document` access.
- **Do not import auto-imported APIs** (Vue reactivity, vue-router composables, `#imports`). Use them directly.
- Keep code **SSR-safe**: guard browser-only APIs with `import.meta.client` (or `<ClientOnly>` when rendering).
- Prefer **server routes** (`app/server/**`) for anything needing secrets or server-only dependencies.

## Development Instructions

### App

Use composables or stores when possible to extract component logic

put script blocks at the top, templates in the middle, styles at the bottom.

script sections should use "state" such as

const state = reactive<T>({})

To avoid having lots of refs

and script blocks should be laid out as:

- Imports
- State / composables/ stores
- methods
- onMounted
-onUnmounted

those sorts of things

Components should be auto-importable through nuxt such as <NavigationAppSidebar /> which would be /components/navigation/AppSidebar.vue

If there is a server and types, methods, or utilities will be shared between them and the client used the shared/ directory

If available always verify work with linters, and type checking

