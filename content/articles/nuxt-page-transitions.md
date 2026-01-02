---
title: 'Nuxt page transitions with CSS'
date: '2025-11-20'
tags: ['nuxt', 'css', 'ux']
description: 'Adding a smooth transition to page changes to prevent jarring navigation'
---

# Adding page transitions with CSS in Nuxt

One thing I always implement in new Nuxt projects is a soft transition between pages. It makes navigation feel a little less jarring if the content layout is changing.

If you used to add [transitions to SPAs with vue-router](https://router.vuejs.org/guide/advanced/transitions), then you're familiar with the result we're looking to achieve.

It's actually pretty simple to do, and only takes a few lines of code.

First open your `nuxt.config.ts` and add the following

```typescript [nuxt.config.ts]
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // https://nuxt.com/docs/4.x/api/nuxt-config#pagetransition
    pageTransition: {
      // https://vuejs.org/api/built-in-components#transition
      mode: 'out-in',
      name: 'page',
    },
  },
    css: [
    '~/assets/styles/css/main.css',
  ],
})
```

Then lets create an associated `main.css` in the app assets to hold the transition styling.

```css [app/assets/styles/css/main.css]
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

Now when users navigate between your pages there'll be a slight transition giving a breath between content.
