---
title: 'A Nuxt hydration mismatch that was not a date bug'
date: '2025-10-02'
tags: ['nuxt', 'vue', 'ssr']
description: 'The server HTML was correct. The client disagreed anyway. Of course it did.'
theme:
  light:
    - '#ffffff'
    - '#ccfbf1'
    - '#5eead4'
  dark:
    - '#ecfeff'
    - '#99f6e4'
    - '#2dd4bf'
robots: index, follow
sitemap:
  lastmod: 2025-10-02
ogImage:
  props:
    title: 'A Nuxt hydration mismatch that was not a date bug'
    description: 'The server HTML was correct. The client disagreed anyway. Of course it did.'
---

# A Nuxt hydration mismatch that was not a date bug

Hydration warnings always arrive with the same opening act: someone on the team says **"It is probably `new Date()`."**

Sometimes they are right. This time they were wrong, which meant we got to spend an afternoon in the fun part of Vue.

## The symptom

Our settings page rendered a usage summary. On hard refresh it looked fine. After client navigation it flickered and Vue logged a hydration mismatch in the console.

The component was innocent-looking:

```vue [UsageSummary.vue]
<script setup lang="ts">
const { data: usage } = await useFetch('/api/usage')
</script>

<template>
  <p v-if="usage">
    {{ usage.remaining }} of {{ usage.limit }} requests remaining
  </p>
</template>
```

No dates. No `window`. No dark mode toggle doing crimes. Still broken.

## What actually happened

The layout wrapped the page in a client-only banner when a feature flag resolved asynchronously:

```vue [AppLayout.vue]
<template>
  <BetaBanner v-if="showBetaBanner" />
  <slot />
</template>
```

On the server, `showBetaBanner` was `false` because the flag store had not hydrated yet. On the client, local storage flipped it to `true` before hydration finished. DOM trees diverged. Vue panicked. Usage summary took the blame because it was the first numeric text node.

Classic.

## The fix

Feature flags that affect layout need a stable SSR default:

```typescript [use-feature-flag.ts]
export const useFeatureFlag = (key: string) => {
  const enabled = useState(`feature:${key}`, () => false)

  onMounted(() => {
    enabled.value = readFlagFromStorage(key)
  })

  return enabled
}
```

Server and client both start at `false`. After mount, the banner may appear. That is a client enhancement, not a hydration lie.

We also moved the banner out of the root layout into a portal that mounts after `onMounted`. Less elegant, equally effective.

## How I debug these now

1. Reproduce with a hard refresh, not just client nav
2. Search for anything reading `localStorage`, `sessionStorage`, or `matchMedia` during setup
3. Diff the server HTML against the client's first render in DevTools
4. Suspect layout wrappers before leaf components

Hydration bugs are rarely where the console points. They are where state diverges earliest in the tree.

Nuxt makes SSR easy until it makes it very honest.
