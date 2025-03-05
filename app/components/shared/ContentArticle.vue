<script setup lang="ts">
import ContentHeader from './ContentHeader.vue'

defineProps<{
  content?: ContentType
}>()
const commentsContainer = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.setAttribute('repo', 'aidanhibbard/aidanhibbard')
  script.setAttribute('issue-term', 'og:title')
  script.setAttribute('theme', 'github-dark')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', 'true')
  commentsContainer.value?.appendChild(script)
})
</script>

<template>
  <article
    v-if="content"
    class="max-w-4xl mx-auto p-6 relative"
  >
    <ContentHeader
      :content="content"
    />

    <!-- TOC Sticking to the Right -->
    <SharedContentToc
      class="absolute top-20 right-0 max-w-xs hidden lg:block"
      :links="content.meta.body.toc.links"
    />

    <ContentRenderer
      class="my-4 prose mx-auto"
      :value="content.meta"
    />

    <div
      ref="commentsContainer"
      class="mt-8"
    />
  </article>
</template>

