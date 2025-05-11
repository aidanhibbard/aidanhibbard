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

Lately when I've been creating a new Nuxt project, I've been starting with the upgrade to [version four](https://nuxt.com/docs/getting-started/upgrade#opting-in-to-nuxt-4) right away. [It's simple to upgrade](https://nuxt.com/docs/getting-started/upgrade#migrating-using-codemods), [has a cleaner directory structure](https://nuxt.com/docs/getting-started/upgrade#new-directory-structure), and the removal of [the nuxt window object](https://nuxt.com/docs/getting-started/upgrade#removal-of-window__nuxt__-object).

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
