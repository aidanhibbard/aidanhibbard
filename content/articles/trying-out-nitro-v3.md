---
title: 'Trying out Nitro V3'
date: '2025-10-31'
tags: ['nitro', 'vite', 'vue', 'react']
description: 'Creating lightweight servers to back SPA frontends, using a Nuxt like DX.'
---

# Trying out Nitro V3

[Nitro V3 first look is out](https://v3.nitro.build/) and while it's an incredible tool, I have to imagine it comes along with [Vite's announcement to add a SAAS fee](https://voidzero.dev/posts/announcing-vite-plus).

So while a Vite plugin for Nuxt, and Nitro is going to be amazing for DX, I hate that it seems to line up with a subscription service.

## Diving in

If you haven't seen [the release video for V3 from Vite conf](https://www.youtube.com/watch?v=189wogO3aCE&list=PLqGQbXn_GDmkJaoykvHCUmXUPjhgH2bVr&index=8), I'd highly recommend checking it out. Pooya does an incredible job of explaining technologies.

The TLDR of the plugin:

- Nitro will fulfill any routes not handled by your spa front end

- Nitro will use your index.html as a template, or [you can pass a custom one](https://v3.nitro.build/docs/renderer)

- It generates a .output directory

If you're already familiar with Nitro, there's not much new here. You use H3 to define your handlers, or another "fetch" based framework.

From the setup though my biggest gripe is that they keep calling the "server" directory the "routes" directory. Pooyas' Example setup was something that looked like `./routes/my-handler.ts`, which makes you think that it's a server page, or some way of rendering your spa on the server.

So my first goal when setting up the project was to create a more "Nuxt like" DX where we split out app / server code.

## Creating a good DX

Okay first things first, no more `./routes` I want a `./server` concern, we can accomplish this by telling Nitro to use server as the directory.

```typescript

