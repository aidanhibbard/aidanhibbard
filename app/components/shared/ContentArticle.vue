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

onMounted(loadComments)

// Watch for theme changes and reload comments
watchEffect(() => {
  loadComments()
})
</script>

<template>
  <div class="relative flex justify-center w-full">
    <!-- Table of Contents (Sticky, Floating Left) -->
    <div class="hidden xl:block w-64 fixed left-10 top-20">
      <SharedContentToc
        v-if="content?.meta?.body?.toc?.links"
        :links="content.meta.body.toc.links"
      />
    </div>

    <!-- Main Content (Centered) -->
    <article
      v-if="content"
      class="max-w-4xl w-full p-6 relative flex flex-col items-center"
    >
      <!-- Ensure Content Header Renders First -->
      <template v-if="content.meta">
        <ContentHeader
          :content="content"
          class="w-full max-w-3xl"
        />

        <ContentRenderer
          v-if="content.meta.body"
          class="my-4 prose w-full max-w-3xl"
          :value="content.meta"
        />
      </template>

      <!-- Comments Section (Visible Below Content) -->
      <div
        id="comments"
        ref="commentsContainer"
        class="mt-8 mx-auto w-full max-w-xl"
      />
    </article>
  </div>
</template>
