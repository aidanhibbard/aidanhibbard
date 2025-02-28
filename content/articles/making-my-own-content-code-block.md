---
title: 'Making my own content code block'
desc: 'Wrapping the '
publishedAt: 02-25-25
lastEditedAt: 02-25-25
path: '/articles/making-my-own-content-code-block'
tags:
  - 'Nuxt 3'
  - 'Nuxt Content'
  - 'Tailwind'
  - 'TypeScript'
---

## Introduction

When I took on the upgrade from Nuxt 2 -> Nuxt 3 I expected lots of complexity, what I didn't expect though was the cost.

My personal sites have always used some kind of static site generator that converts markdown, and most if not all come with some free tools to render your page. These are typically redundencies such as a table of contents, code blocks, headers, etc.

I was excited to see what new components, and tools I'd get to work with in the new version of content. Everything was using Tailwind, and the Nuxt UI so it seemed to be a perfect fit for the task.

Picture my dismay when I saw the price to access these components was $249, and the price doubles for every few team members you need.

I was already in to deep to turn back at this point, and really didn't feel up to paying for Tailwind UI or Nuxt UI to make life easier.

## A slightly worse adaptation

Getting started everything seemed pretty simple to build:

- A header for the code file name

- A button to copy the code

- A nice icon to display the code type

My biggest focus was finding an icon set that supported the languages I wanted to work with. This ended up being a pretty short task, Nuxt Icon already supported a wide range of icon sets. Through Icones I found [Catppuccin](https://google.com) which had all the icons I needed to make this work.

Next step was to write some actual code.

In order to make this work I needed to pass two props to this component

- A filename for the code (if applicable)

- A file type for the code (if applicable)

Why do we need a seperate file type from the file name? That sounds like code duplication, and that's bad right?

There's a few instances where Catppuccin differed from my file types, where I noticed it first was that my config files were `something.yml` and their icon was `yaml`.

We'll start by creating a component in the `/components/content/` directory so that Nuxt will autoload these components later when we add it to our content.

```vue [components/content/BaseCode.vue]
<script setup lang="ts">
const props = defineProps<{
  name?: string
  icon?: string
}>()
</script>

<template>

</template>
```

Now we need a simple code block header to display this data.

```vue [components/content/BaseCode.vue] icon=vue
<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 flex flex-col overflow-hidden bg-white relative my-4"
  >
    <button
      class="hover:text-gray-600 absolute top-2 right-2"
    >
      <!--
      My code uses heroicons for most things
      choose your own copy icon here if you'd like :)
      v-tooltip comes from
      https://github.com/Akryum/floating-vue
      -->
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

Now that we've got a column layout setup, we can unwrap the content code section into our own component.

```vue [components/content/BaseCode.vue] meta-info=vue
<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 flex flex-col overflow-hidden bg-white relative my-4"
  >
    <button
      class="hover:text-gray-600 absolute top-2 right-2"
    >
      <!--
      My code uses heroicons for most things
      choose your own copy icon here if you'd like :)
      v-tooltip comes from
      https://github.com/Akryum/floating-vue
      -->
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
    <div
      ref="codeWrapper"
      class="p-4 text-md bg-gray-50 text-gray-800 overflow-x-scroll"
    >
    <!-- https://content.nuxt.com/docs/components/slot -->
      <slot
        mdc-unwrap="code"
      />
    </div>
  </div>
</template>
```

If you look through the code you'll notice a ref on the code wrapper, and that's to grab the code content, and copy it to the clipboard.

To add the copy functionality we just need to add a click method to the button holding our copy icon.

```vue [components/content/BaseCode.vue] icon=vue
<script setup lang="ts">
// ...

const defaultMsg = 'Copy to clipboard'

const state = reactive({
  copyMsg: defaultMsg,
})

const codeWrapper = ref<HTMLElement | null>(null)
const copyToClipboard = async () => {
  if (codeWrapper.value) {
    try {
      await navigator.clipboard.writeText(codeWrapper.value.innerText.split('\n') // Split into an array of lines
        .filter(line => line.trim() !== '') // Remove empty lines
        .join('\n'))
      state.copyMsg = 'Copied to clipboard!'
    }
    catch {
      state.copyMsg = 'Failed to copy'
    }
    finally {
      state.copyMsg = defaultMsg
    }
  }
}
</script>

<template>
<!-- ... -->
  <button
  class="hover:text-gray-600 absolute top-2 right-2"
  @click="copyToClipboard"
>
  <DocumentDuplicateIcon
    v-tooltip="state.copyMsg"
    class="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors"
  />
</button>
<!-- ... -->
</template>
```

## Component code

If you've been following along your code should look similar to this.

```vue [components/content/BaseCode.vue] icon=vue
<script setup lang="ts">
import { ref } from 'vue'
import { DocumentDuplicateIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  name?: string
  icon?: string
}>()

const defaultMsg = 'Copy to clipboard'

const state = reactive({
  copyMsg: defaultMsg,
})

const codeWrapper = ref<HTMLElement | null>(null)
const copyToClipboard = async () => {
  if (codeWrapper.value) {
    try {
      await navigator.clipboard.writeText(codeWrapper.value.innerText.split('\n') // Split into an array of lines
        .filter(line => line.trim() !== '') // Remove empty lines
        .join('\n'))
      state.copyMsg = 'Copied to clipboard!'
    }
    catch {
      state.copyMsg = 'Failed to copy'
    }
    finally {
      state.copyMsg = defaultMsg
    }
  }
}
</script>

<template>
  <div
    class="mx-auto w-full rounded-lg border border-gray-300 flex flex-col overflow-hidden bg-white relative my-4"
  >
    <button
      class="hover:text-gray-600 absolute top-2 right-2"
      @click="copyToClipboard"
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
    <div
      ref="codeWrapper"
      class="p-4 text-md bg-gray-50 text-gray-800 overflow-x-scroll"
    >
      <slot
        mdc-unwrap="code"
      />
    </div>
  </div>
</template>

```

Now we can wrap our code blocks in our component like so:

## Closing thoughts

This solution is not perfect by any means, but it's a working component. Some problems I still have are even though some blocks don't need scrolling but because of the overflow-x-scroll on the code, browsers will still apply a horizontal scroll bar 

Maybe for Pt 2 I'll find a solution, but I would like to handle previewing code in the blocks, so I'll update this article with a link when that part comes out.
