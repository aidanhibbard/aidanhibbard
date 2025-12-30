<script setup lang="ts">
import { motion } from 'motion-v'
import { Button } from '~/components/shadcn/ui/button'
import { Badge } from '~/components/shadcn/ui/badge'
import { Separator } from '~/components/shadcn/ui/separator'
import { Calendar, Clock, Linkedin, Link2 } from 'lucide-vue-next'

const route = useRoute()
const requestUrl = useRequestURL()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('articles').path(route.path).first()
})

// https://nuxtseo.com/docs/nuxt-seo/guides/nuxt-content
useSeoMeta(page.value!.seo ?? {})

const readableDate = computed(() => {
  const d = page.value?.date
  if (!d) return null
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(d))
  }
  catch {
    return d
  }
})

// Try to use provided reading time if available; otherwise omit
const readingTime = computed(() => {
  const mins = (page.value as unknown as { readingTime?: { minutes?: number } })?.readingTime?.minutes
  if (!mins) return null
  const rounded = Math.max(1, Math.round(mins))
  return `${rounded} min read`
})

const pageUrl = computed(() => new URL(route.path, requestUrl).toString())

const shareLinkedIn = async () => {
  const url = encodeURIComponent(pageUrl.value)
  const share = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
  await navigateTo(share, {
    external: true,
    open: {
      target: '_blank',
    },
  })
}

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(pageUrl.value)
  }
  catch (err) {
    void err
  }
}
</script>

<template>
  <div
    v-if="page"
    class="container mx-auto px-4 py-24 max-w-3xl"
  >
    <h1
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.2 }"
      class="text-5xl md:text-6xl font-bold tracking-tight text-balance mb-6 leading-tight"
    >
      {{ page.title }}
    </h1>

    <p
      v-if="page.description"
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.3 }"
      class="text-xl text-muted-foreground text-pretty leading-relaxed mb-8"
    >
      {{ page.description }}
    </p>

    <motion.div
      :initial="{ opacity: 0, y: 20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, delay: 0.4 }"
      class="flex items-center justify-between mb-12"
    >
      <div class="flex items-center gap-6 text-sm text-muted-foreground">
        <div
          v-if="readableDate"
          class="flex items-center gap-2"
        >
          <Calendar class="h-4 w-4" />
          <span>{{ readableDate }}</span>
        </div>
        <div
          v-if="readingTime"
          class="flex items-center gap-2"
        >
          <Clock class="h-4 w-4" />
          <span>{{ readingTime }}</span>
        </div>
        <div
          v-if="page.tags.length"
          class="flex flex-wrap items-center gap-2"
        >
          <Badge
            v-for="tag in page.tags"
            :key="tag"
            variant="secondary"
          >
            {{ tag }}
          </Badge>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          @click="shareLinkedIn"
        >
          <Linkedin class="h-4 w-4" />
          <span class="sr-only">Share on LinkedIn</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          @click="copyLink"
        >
          <Link2 class="h-4 w-4" />
          <span class="sr-only">Copy link</span>
        </Button>
      </div>
    </motion.div>

    <Separator class="mb-12" />

    <article
      class="prose prose-neutral dark:prose-invert max-w-none break-normal hyphens-none whitespace-normal prose-p:break-normal prose-a:wrap-break-word prose-pre:overflow-x-auto prose-code:overflow-x-auto prose-img:rounded-xl"
    >
      <ContentRenderer
        as="div"
        :value="page"
      />
    </article>
  </div>
</template>
