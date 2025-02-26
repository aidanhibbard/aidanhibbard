---
title: 'Making My Own Content Code Block'
desc: 'Why pay someone for components when you can make something slightly worse for free?'
publishedAt: 02-25-25
lastEditedAt: 02-25-25
path: '/articles/making-my-own-content-code-block'
tags:
  - 'Nuxt 3'
  - 'Nuxt Content'
  - 'Tailwind'
  - 'TypeScript'
---

::ContentHeader

## Introduction

::

::ContentParagraph
When I took on the upgrade from Nuxt 2 -> Nuxt 3 I expected lots of complexity, what I didn't expect though was the cost.
::

::ContentParagraph
My personal sites have always used some kind of static site generator that converts markdown, and most if not all come with some free tools to render your page. These are typically redundencies such as a table of contents, code blocks, headers, etc.
::

::ContentParagraph
I was excited to see what new components, and tools I'd get to work with in the new version of content. Everything was using Tailwind, and the Nuxt UI so it seemed to be a perfect fit for the task.
::

::ContentParagraph
Picture my dismay when I saw the price to access these components was $249, and the price doubles for every few team members you need.
::

::ContentParagraph
I was already in to deep to turn back at this point, and really didn't feel up to paying for Tailwind UI or Nuxt UI to make life easier.
::

::ContentHeader

## A slightly worse adaptation

::

::ContentParagraph
Getting started everything seemed pretty simple to build:

- A header for the code

- A button to copy the code

- A nice icon to display the code type

::

::ContentParagraph
My biggest focus was finding an icon set that supported the languages I wanted to work with. This ended up being a pretty short task, Nuxt Icon already supported a wide range of icon sets. Through Icones I found Catppuccin which had all the icons I needed to make this work.
::

::ContentParagraph
Next step was to write some actual code.
::

::ContentParagraph
In order to make this work I needed to pass two props to this component

- A filename for the code (if applicable)

- A file type for the code (if applicable)

::

::ContentParagraph
Why do we need a seperate file type from the file name? That sounds like code duplication, and that's bad right?
::

::ContentParagraph
There's a few instances where Catppuccin differed from my file types, where I noticed it first was that my config files were `something.yml` and their icon was `yaml`.
::

::ContentParagraph
So we start with some props.
::

::ContentCode{name="ContentCode.vue" icon="vue"}

```vue
<script setup lang="ts">
const props = defineProps<{
  name?: string
  icon?: string
}>()
</script>

<template>

</template>
```

::

::ContentParagraph
Now we need a simple code block header to display this data.
::

::ContentCode{name="ContentCode.vue" icon="vue"}

```vue
<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 flex flex-col overflow-hidden bg-white relative my-4"
  >
    <button
      class="hover:text-gray-600 absolute top-2 right-2"
    >
      <DocumentDuplicateIcon
        v-tooltip="state.copyMsg"
        class="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors"
      />
    </button>
    <div
      v-if="props.name || props.icon"
      class="flex items-center justify-between p-2 border-b border-gray-300 bg-gray-100 text-gray-800 text-sm font-mono"
    >
      <div class="flex items-center gap-2 pl-2">
        <Icon
          v-if="props.icon"
          :name="`catppuccin:${props.icon}`"
          class="w-6 h-6 text-gray-600"
        />
        <span class="font-semibold text-gray-700">{{ name }}</span>
      </div>
    </div>
  </div>
</template>
```

::

::ContentParagraph
Generating the .npmrc for the docker image needs to be done as a bash step before your docker build step
::

::ContentCode{name="cd.yml" icon="yaml"}

```yml
steps:
  - name: bash
    args:
      - '-c'
      - |
        echo "@taskforcesh:registry=https://npm.taskforce.sh/" > .npmrc
        echo "//npm.taskforce.sh/:_authToken=$$NPM_TASKFORCESH_TOKEN" >> .npmrc
        echo "always-auth=true" >> .npmrc
        echo "@your-org:registry=https://registry.npmjs.org/" >> .npmrc
        echo "//registry.npmjs.org/:_authToken=$$NPM_TOKEN" >> .npmrc
    secretEnv: ['NPM_TOKEN', 'NPM_TASKFORCESH_TOKEN']
```

::

::ContentParagraph
Now that the npmrc is created mount it as a secret in your docker image
::

::ContentCode{name="cd.yml" icon="yaml"}

```bash
RUN --mount=icon=secret,id=npmrc,target=YOUR_APP_DIR/.npmrc npm install
RUN npm run build
```

::

::ContentParagraph
That's it! You should be able to add multiple private module sources to your cloud build pipeline.
::
