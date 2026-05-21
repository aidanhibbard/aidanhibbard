---
title: View transitions in Nuxt
date: '2026-05-19'
tags: ['nuxt', 'vue', 'css', 'view-transitions']
description: A short fade on every route change, and why the browser View Transitions API is the next step for dashboards.
sitemap:
  lastmod: 2026-05-19
ogImage:
  props:
    title: View transitions in Nuxt
    description: A short fade on every route change, and why the browser View Transitions API is the next step for dashboards.
---

## Background

Most SPAs still hard-cut between routes. One page unmounts, the next mounts, and the user gets a flash of white or a layout jump. It feels cheap even when the rest of the app is polished.

I wanted this site to feel a little more intentional when you move between writing, about, and home. Nothing flashy. Just a consistent fade so navigation reads as continuous instead of a reload.

That turned into a small Nuxt config change and a few lines of CSS. Along the way I kept bumping into the [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API), which is a different layer entirely and the one I think more teams should reach for, especially on data-heavy dashboards.

## What I set up on this site

Nuxt wraps `<NuxtPage />` in Vue's [`<Transition>`](https://vuejs.org/guide/built-ins/transition) component when you opt in. The [page transitions docs](https://nuxt.com/docs/4.x/getting-started/transitions#page-transitions) describe the full API: global defaults in `nuxt.config`, per-page overrides with [`definePageMeta`](https://nuxt.com/docs/4.x/api/utils/define-page-meta), layout transitions, dynamic names via middleware, and JavaScript hooks if you want GSAP-level control.

I enabled a global page transition in config:

```ts
// nuxt.config.ts
app: {
  pageTransition: {
    mode: 'out-in',
    name: 'page',
  },
},
```

`out-in` means the old page finishes leaving before the new one enters. That avoids two full pages stacking on top of each other during the swap, which looks messy on content-heavy routes.

The CSS lives in `app/assets/css/main.css`:

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
```

Nuxt generates class names from the transition `name`. With `name: 'page'`, you get `.page-enter-active`, `.page-leave-to`, and the rest. Vue toggles those classes around the route change.

`app.vue` is boring on purpose. `<NuxtLayout>` and `<NuxtPage />` with no extra transition props. The global config handles it:

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

That is the whole setup for this portfolio. Subtle, cheap to maintain, and it works everywhere Vue transitions work.

## The View Transitions API underneath

What I use today is Vue's transition system: CSS classes on enter and leave. The browser's View Transitions API is native and works differently.

At a high level, you call [`document.startViewTransition()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition). The browser captures a snapshot of the old DOM, applies your DOM updates, captures the new state, and animates between the two. You style that animation with pseudo-elements like [`::view-transition-old(root)`](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API/Using_view_transitions) and `::view-transition-new(root)`.

The big difference is **shared element transitions**. Vue's `<Transition>` animates a single component mounting and unmounting. The View Transitions API can morph one element on page A into a different element on page B if you give them the same [`view-transition-name`](https://developer.mozilla.org/en-US/docs/Web/CSS/view-transition-name). That is the feature dashboards actually need: a sidebar that stays put, a chart title that slides into a detail header, a table row that expands into a full record view.

Same-origin navigations in supporting browsers can use the API for full document transitions. In SPA land, the framework wires route changes to `startViewTransition` so you do not hand-roll it on every link click.

## How Vue Router and Astro handle it

### Vue Router (and Nuxt on top of it)

Vue Router does not ship a first-class view transitions plugin the way Astro does. You typically hook navigation yourself: wrap the DOM update in `document.startViewTransition` inside a router guard or a small plugin, or lean on your meta-framework to do it.

Nuxt gives you two paths, documented together on the [transitions page](https://nuxt.com/docs/4.x/getting-started/transitions):

1. **Vue page and layout transitions** (what this site uses). Configured via `app.pageTransition` / `app.layoutTransition`, backed by `<Transition>`. Per-page control through `definePageMeta`. [Layout transitions](https://nuxt.com/docs/4.x/getting-started/transitions#layout-transitions) are separate; if you change layouts during navigation, the page transition you set globally will not run unless you also configure layout transitions.

2. **Experimental View Transitions API integration**. Enable with `experimental.viewTransition: true` in `nuxt.config`. Nuxt then calls the browser API around route changes. You can opt pages in or out with `definePageMeta({ viewTransition: false })`, set [view transition types](https://nuxt.com/docs/4.x/getting-started/transitions#view-transition-types) for asymmetric forward/back animations, and listen on the `page:view-transition:start` hook to tweak the [`ViewTransition`](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransition) object at runtime.

The docs also note a practical conflict: if you enable native view transitions, you may want a middleware that disables Vue `pageTransition` when `document.startViewTransition` exists, so you are not running two transition systems at once.

I have not flipped on `experimental.viewTransition` here yet. The fade is enough for a content site. The native API is where I would go next if I added shared-element motion between list and detail views.

### Astro

[Astro view transitions](https://docs.astro.build/en/guides/view-transitions/) lean hard into the browser API. You add `<ViewTransitions />` (or the newer client router equivalent) to your layout, and Astro's client router intercepts same-origin navigations and wraps updates in `startViewTransition`.

Astro's sweet spot is **`transition:name` and `transition:animate` directives** on elements. Mark the hero on the index page and the hero on the about page with the same name, and the browser morphs between them. They document `fade`, `slide`, and custom animations, plus `transition:persist` for elements that should survive the navigation without remounting.

Astro feels opinionated out of the box for marketing sites and content. Nuxt splits the problem: Vue transitions for simple cases, experimental native integration when you need shared elements and type-aware navigation.

## Why dashboards should care more than blogs

A portfolio fade is nice. A dashboard transition is structural.

Data-heavy UIs punish hard cuts:

- **List to detail.** A row in a table becomes a full page. Without a shared transition, filters, selection state, and scroll position all feel like they reset even when the data is related.
- **Persistent chrome.** Side nav, date range picker, and workspace switcher should not blink out and back in on every route. `view-transition-name` on those regions keeps the shell stable while content crossfades.
- **Wayfinding.** Forward and back through drill-down paths (overview → team → user → invoice) is easier when motion implies direction. Nuxt's [view transition types](https://nuxt.com/docs/4.x/getting-started/transitions#view-transition-types) (`slide-left` vs `slide-right` based on route params) exist for exactly that.

Users already tolerate loading skeletons and spinners in dashboards. Adding 200–300ms of purposeful motion between views makes the app feel faster because the interface **continues** instead of **restarts**.

The Nuxt docs call out one caveat worth respecting: view transitions freeze DOM updates while they run. If your page setup blocks on heavy `useAsyncData` fetches, you may want to defer enabling native transitions until data is ready, or stay on Vue opacity fades for those routes. For dashboards, that usually means transitioning after the shell is painted and letting charts fill in inside the new view, not before.

## What I would recommend

If you are on Nuxt today:

1. Turn on **global page transitions** if you have not. Two config lines and a CSS block get you most of the way. See [page transitions](https://nuxt.com/docs/4.x/getting-started/transitions#page-transitions).
2. When you outgrow opacity fades, enable [`experimental.viewTransition`](https://nuxt.com/docs/4.x/getting-started/transitions#view-transitions-api-experimental) and name the elements that should persist or morph.
3. Respect [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion). Nuxt's default `viewTransition: true` skips native transitions when the user asks for reduced motion. Keep that behavior.

If you are greenfield and mostly static with islands of interactivity, Astro's view transitions story is excellent. If you are building authenticated, data-bound apps in Vue, Nuxt gives you both layers in one place.

Everybody shipping multi-page product UI should treat transitions as part of the UX budget, not a polish pass at the end. Blogs benefit from a fade. Dashboards benefit from users always knowing where they came from and what changed. The underlying API is finally good enough to do that without a custom animation framework. Use it.
