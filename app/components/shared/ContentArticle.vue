<script setup lang="ts">
import ContentHeader from './ContentHeader.vue'

const props = defineProps<{
  content?: ContentType
}>()

useSeoMeta(props.content.value?.seo || {})
const commentsContainer = ref<HTMLDivElement | null>(null)
const activeSection = ref<string | null>(null)

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

const observeSections = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5, // Section is considered "active" when 50% of it is visible
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, options)

  props.content.meta.body.toc.links.forEach((item) => {
    const section = document.getElementById(item.id)
    if (section) {
      observer.observe(section)
    }
  })
}

watchEffect(() => {
  observeSections()
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

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
      <!-- Main content -->
      <div class="prose mx-auto md:col-span-2">
        <ContentRenderer
          :value="content.meta"
          class="my-4"
        />
      </div>

      <!-- Table of Contents -->
      <nav
        class="md:block hidden sticky top-10 md:col-span-1 md:border-l border-gray-200 dark:border-gray-700 pl-6 pt-6"
      >
        <ul>
          <li
            v-for="item in props.content.meta.body.toc.links"
            :key="item.id"
            :class="[
              'py-1',
              activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-200',
            ]"
          >
            <a
              :href="`#${item.id}`"
              class="block"
            >
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div
      ref="commentsContainer"
      class="mt-8"
    />
  </article>
</template>
