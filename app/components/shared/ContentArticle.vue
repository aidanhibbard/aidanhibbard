<script setup lang="ts">
import ContentHeader from './ContentHeader.vue'

const { theme } = useTheme()
const props = defineProps<{
  content?: ContentType
}>()

useSeoMeta(props.content?.seo || {})

const commentsContainer = ref<HTMLDivElement | null>(null)

const loadComments = () => {
  if (!commentsContainer.value) return

  // Remove existing Utterances iframe if present
  commentsContainer.value.innerHTML = ''

  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.setAttribute('repo', 'aidanhibbard/aidanhibbard')
  script.setAttribute('issue-term', 'og:title')
  script.setAttribute('theme', theme.value === 'dark' ? 'github-dark' : 'github-light')
  script.setAttribute('crossorigin', 'anonymous')
  script.setAttribute('async', 'true')
  commentsContainer.value.appendChild(script)
}

// Watch for theme changes and reload comments
watchEffect(() => {
  loadComments()
})
</script>

<template>
  <div class="relative w-full flex flex-col xl:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
    <!-- Table of Contents (Sticky on Desktop) -->
    <aside
      class="hidden xl:block xl:w-64 sticky top-20 self-start"
    >
      <SharedContentToc
        v-if="content?.meta?.body?.toc?.links"
        :links="content.meta.body.toc.links"
      />
    </aside>

    <!-- Main Content Area -->
    <article
      v-if="content"
      class="w-full flex-1 max-w-4xl mx-auto xl:pl-8"
    >
      <!-- Content Header -->
      <template v-if="content.meta">
        <ContentHeader
          :content="content"
          class="w-full max-w-3xl"
        />

        <ContentRenderer
          v-if="content.meta.body"
          class="my-6 prose w-full max-w-3xl"
          :value="content.meta"
        />
      </template>

      <!-- Comments Section -->
      <div
        id="comments"
        ref="commentsContainer"
        class="mt-8 mx-auto w-full max-w-xl"
      />
    </article>
  </div>
</template>
