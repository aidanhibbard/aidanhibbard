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

- Nitro will fulfill any routes not handled by your spa front end.

- Nitro will use your index.html as a template, or [you can pass a custom one](https://v3.nitro.build/docs/renderer).

- It generates a .output directory with a single entry.

If you're already familiar with Nitro, there's not much new here. You use H3 to define your handlers, or another "fetch" based framework.

From the setup though my biggest gripe is that they keep calling the "server" directory the "routes" directory. Pooyas' Example setup was something that looked like `./routes/my-handler.ts`, which makes you think that it's a server page, or some way of rendering your spa on the server.

So my first goal when setting up the project was to create a more "Nuxt like" DX where we split out app / server code.

## Creating a good DX

Okay first things first, no more `./routes` I want a `./server` concern, we can accomplish this by telling Nitro to use server as the directory.

```typescript [vite.config.ts]
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [nitro()],
  nitro: {
    serverDir: './server'
  },
});
```

Next lets ditch the src dir, and rename it to app.

I'm not a huge fan of the app convention like Nuxt uses, because the whole project is your app. You're just splitting out the front, and backend concerns.

However since it's the new pattern, I'll avoid deviating here.

1. Rename ./src to ./app

2. Update your css entry from index.html (if you're not pulling your css in main.ts)

3. Update your main.ts entry in the index.html to pull from ./app

After following all of that you should now have a server, and app directory for your vite project.

## Where would I use this?

Okay, this is the real question for any tool: where is its practical application?

If you need SSR, don't re-invent the wheel, pickup a framework such as Astro, or Nuxt.

However, if you're building a new dashboard where all data can be fecthed from the client. Then I think this is likely the new tooling I'll reach for.

In to many cases do I see dashboards end up with a weird mixture of data being fetched on the server to populate a table, then using the client after. People using SSR tools on the client, and vice versa.

With Vite + Nitro, it's purely client / server with a single deployment. So we can build apps with minimal overhead, and provide a solid DX for teams that want something they wont be arguing with when they go to scale.

I'm looking forward to seeing what Nuxt might look like as a Vite plugin, and how the expierence from regular Nuxt will change if at all.
