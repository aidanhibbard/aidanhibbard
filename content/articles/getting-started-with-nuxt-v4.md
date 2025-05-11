---
title: 'Getting started with Nuxt v4'
description: 'Stay ahead of the curve by tuning into the v4 changes before the release.'
publishedAt: 05-09-2025
tags:
  - 'nuxt'
---

## Introduction

Whenever I create a new project I typically like to look at the beta, or "nightly" build for the frameworks / tools I'm planning to use.
I'm not a big fan of starting with tech debt, so even if it comes with a few bumps along the way it saves time when the next upgrade hits.

Lately when I've been creating a new Nuxt project, I've been starting with the upgrade to [version four](https://nuxt.com/docs/getting-started/upgrade#opting-in-to-nuxt-4) right away. [It's simple to upgrade](https://nuxt.com/docs/getting-started/upgrade#migrating-using-codemods), [has a cleaner directory structure](https://nuxt.com/docs/getting-started/upgrade#new-directory-structure), and comes with the removal of [the nuxt window object](https://nuxt.com/docs/getting-started/upgrade#removal-of-window__nuxt__-object).

## Opting into the new version

Getting started with the next version of Nuxt is pretty straightforward:

1. Start a new project with the create-nuxt command `npm init nuxt@latest`

2. Go through the steps to add what you need

3. Run the dev server to generate your .nuxt directory

Now you can opt into the next version by setting the "future" options compatibilityDate to `4` in the nuxt config (note: if you're doing this with an existing project [it's recommended to be on the latest version.](https://nuxt.com/docs/getting-started/upgrade#opting-in-to-nuxt-4))

```ts
// nuxt.config.ts
...
future: {
  compatibilityVersion: 4,
},
...
```

Now you can run [the codemod tool](https://nuxt.com/docs/getting-started/upgrade#migrating-using-codemods) to implement the version four changes you're after with `npx codemod@latest nuxt/4/migration-recipe`. This will allow you to choose what features of version four that you're after, and will apply the necessary changes for you.

## New directory structure

The [new directory structure](https://nuxt.com/docs/getting-started/upgrade#new-directory-structure) is likely the best part of the version four upgrade, and to be quite honest I'm pretty dissapointed we didn't get it originally with version three.

This splits your app into two directories `server` and `app` which right off the bat you can tell what belongs in each. Your `app.vue`, pages, composables and other front end will live in the `app` directory. While all your server logic will live comfortably in the `server` directory still with little, to no changes required.

Note: if you opted into ESLint you'll need to update the reference to the nuxt config in the `eslint.config.mjs` file. Just add a `./` to the beginning of the reference like such `import withNuxt from './.nuxt/eslint.config.mjs';`. This is due to the [new file reference system](https://nuxt.com/docs/getting-started/upgrade#what-changed).

There's a new [shared directory](https://nuxt.com/docs/guide/directory-structure/shared) introduced in the newer versions of nuxt that makes it easier to see what's available to the server and app without digging through lots of directories as you had to before. [Nuxt Authorization](https://github.com/barbapapazes/nuxt-authorization) takes advantage of this by putting permissions in the shared directory to be used by the front, and backend. Super nifty.

## Introduction of useNuxtApp

If you're familiar with serverside rendering you've likely passed data from the server to the client using some kind of script tag, and storing it as json.
Nuxt isn't any different. When data is passed from the server you access it from the `__NUXT__` object available on the window.

Now if you want to access that payload using the Nuxt app directly you can use `useNuxtApp().payload` [which provides a cleaner api](https://nuxt.com/docs/getting-started/upgrade#removal-of-window__nuxt__-object).

However this utility provides a far more powerful feature [multi-app support](https://nuxt.com/docs/getting-started/upgrade#removal-of-window__nuxt__-object).

Nuxt has had layers, and these are powerful themselves, there's a really good article by [Dave Stewart](https://davestewart.co.uk/blog/nuxt-layers/) on using layers to split up applications by domain. This makes breaking up parts of your app more defined, such as an "admin" section being it's own layer of components, pages, logic, etc.

However multi-app support is an _experimental_, runtime feature enabling multiple independent Nuxt applications to coexist and interoperate. You can pass a namespace to useNuxtApp such as `useNuxtApp('checkout')` to create [micro-frontends](https://micro-frontends.org/). For very large organizations with independant teams working on features that need to be treated as seperate apps this will be a major feature to help avoid monoliths where everything is a layer of one app.
