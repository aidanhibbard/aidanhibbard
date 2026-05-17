# Conventions

## Component Names

- First-party Vue component names must be one or two words only. Avoid three-or-more-word component names such as `CreateTeamModal`; prefer a shorter name such as `TeamModal`.

## File naming (TypeScript and modules)

- Use **kebab-case** for essentially all first-party non-Vue source filenames: `my-service.ts`, `pending-team-checkout-payload.ts`, `use-billing.ts`, `team-role.ts`.
- Applies to `server/**`, `shared/**`, `app/composables`, `app/utils`, `app/middleware`, `app/plugins`, `app/stores`, and any `types` / `interfaces` directories (for example `server/interfaces/foo/bar-baz.ts`, `shared/types/teams/team-role.ts`).
- **Exceptions** where the existing layer conventions take precedence:
  - Vue single-file components (for example under `app/components`)
  - Route files under `app/pages`
  - Layout files under `app/layouts`
- Do not add new `PascalCase.ts` or `camelCase.ts` module names outside those exceptions.

## Script Order

## Vue SFC Block Order

- Vue single-file components must use `<script setup lang="ts">` for script blocks.
- When a Vue file has script logic, put `<script setup lang="ts">` first, then `<template>`, then `<style>` only if needed.
- Do not use plain `<script>`, non-setup scripts, or JavaScript-only script blocks in first-party Vue files.

## Script Setup Content Order

Group `script setup` content in this order:

1. Imports
2. Types and interfaces
3. Generic constants or static data: `const pageName = 'test'`
4. Composables
5. Reactive state (`ref`, `reactive`, `shallowRef`) and then `computed`
 - Such as

 ```ts
 const state = reactive<{ page: number }>({ page: 1 })
 ```
6. Method constants
7. Watchers and lifecycle / event hooks

Keep each group contiguous. Do not interleave methods with computed values or watchers.

## Methods

- Declare component and composable methods as constants.
- Prefer:

```ts
const handleSubmit = async (): Promise<void> => {
  // ...
}
```

- Avoid:

```ts
async function handleSubmit(): Promise<void> {
  // ...
}
```

## Composables

- Name composable files in kebab-case, for example `use-example.ts`.
- Export composables as constant functions:

```ts
export const useExample = () => {
  // ...
}
```

- Keep the composable body ordered as:
  - composables
  - state
  - computed
  - method constants
  - watchers / lifecycle hooks
  - return

## Persisted CRUD forms (SSR + client)

For first-party forms that **read and write persisted server state** (settings, billing, entity editors, and similar):

- **Shared schemas:** If a change touches a form, review the existing form implementation patterns and use the shadcn Vue MCP before implementing. Define the form validation schema in `shared/schemas` when the same payload is submitted to the backend, and use that schema from both the form and the server route.
- **Initial load:** Use [`useFetch`](https://nuxt.com/docs/4.x/api/composables/use-fetch) or [`useAsyncData`](https://nuxt.com/docs/4.x/api/composables/use-async-data) so data can be resolved on the **server** and passed through the Nuxt payload for hydration, avoiding an unnecessary duplicate GET on the client when defaults apply.
- **After a successful mutation** (`POST` / `PUT` / `PATCH` / `DELETE`): reconcile the UI with the server by calling **`await refresh()`** on the **same** `useFetch` / `useAsyncData` instance that backs the read model (same URL/key/options pattern). Local `data` should match what the user just saved; avoid leaving the form on stale client-only state.
- **Client-only round trips:** When a fetch or follow-up must **not** run during SSR (for example user-driven writes or refetches that only make sense in the browser), pass **`server: false`** on that `useFetch` / `useAsyncData` call. Nuxt defaults `server` to `true`; there is no separate `client: true` option on these composables—**`server: false`** is the supported way to scope execution to the client (see Nuxt docs for `useFetch` / `useAsyncData` options).
- **Loading:** Use a dedicated `ref` (or the composable’s `pending` where it fits) so the flow is: set loading **`true`** → perform mutation → **`await refresh()`** so async data matches the server → set loading **`false`**.
- **Control flow:** Wrap mutation + `refresh()` in **`try` / `catch` / `finally`**. Always clear loading in **`finally`** so it resets whether the mutation or refresh succeeds or throws.
- **Toasts:** On both success and failure, show feedback with **`toast` from `vue-sonner`** (the app uses the shadcn-style **Sonner** toaster). Keep messages short and specific.

## Tables And Filtered Lists

For first-party tables, paginated lists, filters, search, and data browsing flows such as projects, users, teams, and similar:

- Use shadcn Vue table primitives and consult the shadcn Vue MCP before implementing or substantially changing a table.
- Keep component-owned table state in a single `reactive` object where practical, for example page number, query, filters, sort, and user/team scope.
- Pre-flight the first page by using top-level `await` with `useFetch` or `useAsyncData` so SSR can resolve the initial state.
- Prefer `useFetch` for simple endpoint-backed tables and filters because the query/watch syntax is concise. `useAsyncData` is also fine when custom fetch logic or multiple calls are needed.
- Drive refetching by passing computed query params and explicit `watch` sources for the state fields that should refetch.
- Prefer this pattern:

```vue
<script setup lang="ts">
// You handle component state.
const state = reactive<{
  page: number
  query: string
}>({
  page: 1,
  query: '',
})

// Nuxt handles fetching, SSR pre-flight, hydration, and refetches.
const {
  data: posts,
  status,
  error,
  refresh,
  clear,
} = await useFetch('https://fakeApi.com/posts', {
  query: computed(() => ({
    page: state.page,
    query: state.query,
  })),
  watch: [
    () => state.page,
    () => state.query,
  ],
})
</script>
```

- When using `useAsyncData`, pass the provided `signal` through to `$fetch` so stale requests can be cancelled:

```ts
const { data: posts } = await useAsyncData('posts', (_nuxtApp, { signal }) =>
  $fetch('/api/posts', {
    query: {
      page: state.page,
      query: state.query,
    },
    signal,
  }), {
  watch: [
    () => state.page,
    () => state.query,
  ],
})
```

## Scope

These conventions apply to first-party app code. Do not rewrite vendored-style `shadcn` internals just to force this structure.

## Generated And Vendored Code

- Do not edit generated or vendored-style components directly.
- Prefer customizing behavior at the call site or through first-party wrapper components.
- Use upstream docs, MCP references, or local examples before changing how generated-style primitives are used.

## User Feedback, Loading, And Errors

- For user-triggered async actions, use explicit loading state that makes the UI look intentional while work is in progress.
- Wrap async mutations and user actions in `try` / `catch` / `finally` when failure is possible. Show success and failure feedback with `toast` from `vue-sonner` where the app already uses Sonner.
- Always clear loading state in `finally` so buttons, forms, and controls recover whether the action succeeds or throws.
- Keep toast messages short, specific, and user-facing.

## Logging

- Do not add client-side logging in first-party app code. Avoid `console.log`, `console.warn`, `console.error`, and similar browser logging outside temporary local debugging that is removed before finishing the task.
- Logging should happen on the server only, where logs can use the scoped server logger and avoid leaking browser/user details.
- Do not prefix log messages with service names such as `[service-name]`.
- Create a scoped logger per file with `logger.withTag('name')` and use that tagged logger for all logs in the file.
- Keep log messages focused on the event itself, not the file name.

## Types And Interfaces

- Reusable contracts must live in dedicated `types` or `interfaces` directories, not inside services, routes, or components.
- Do not use `any` types. Use precise types, existing inferred types, generics, `unknown` with narrowing, or small local interfaces instead.
- Use:
  - `app/types` and `app/interfaces`
  - `shared/types` and `shared/interfaces`
  - `server/types` and `server/interfaces`
- Keep local inline typing minimal. It is fine to use small local param or return annotations for one-off helpers.
- If a type or interface is reused or is part of a public contract, move it into the appropriate `types` or `interfaces` directory.
- Do not export types from service implementation files.
- Do not declare `interface` or `type` aliases in route handlers, API handlers, or worker files. Put request bodies, job shapes, and other contracts in the appropriate `types` or `interfaces` directories.

## Server Input Validation

- Validate every server input at runtime before using it. Do not use TypeScript generics as a substitute for validation.
- Use the H3 validated helpers everywhere:
  - `readValidatedBody` instead of `readBody`
  - `getValidatedQuery` instead of `getQuery`
  - `getValidatedRouterParams` instead of `getRouterParam` / `getRouterParams`
- Define reusable route/body/query schemas in `shared/schemas` when the shape is part of an API contract or shared with client code.
- For one-off server-only validation, a small local schema is acceptable, but prefer shared schemas for forms, route contracts, and anything reused across client/server.
- When adding or touching forms, the frontend and backend must use the same shared schema wherever practical.

## Exports

- Files should export one thing only.
- The only exception is a barrel file such as `index.ts`.
- Services should not bundle multiple methods in a single implementation file.
- For service modules, put each method in its own file and re-export from a barrel.

## Server File Structure

- Server and service filenames must use kebab-case, for example `my-service.ts`. The same kebab-case rule applies to `server/interfaces` and `server/types` module filenames (see **File naming (TypeScript and modules)** above).
- Use directories for namespacing related server files, for example `server/services/pusher/credits/team-channel.ts`.
- Client modules such as S3 or Pusher clients should default export the configured client instance from a dedicated file rather than exporting getter helpers.

## Runtime config (`useRuntimeConfig`)

- In any file that needs runtime config, call `useRuntimeConfig()` **once at module scope**, immediately after imports (see `server/services/s3/download-version-artifact.ts`). Destructure what you need from that result, and pass values into functions as needed. Do not call `useRuntimeConfig()` inside nested helpers, utilities, or deep call chains.
- On the client, resolve config at the top of `<script setup>` or at the start of a composable / store factory (before other setup logic), not inside nested functions or callbacks.
- Prefer module-level `useRuntimeConfig()` in server routes and handlers when values do not depend on per-request overrides. Avoid `useRuntimeConfig(event)` inside handler bodies when the root config is sufficient.
