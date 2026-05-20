<script setup lang="ts">
const props = defineProps<{
  contentPath: string
}>()

const { page, tocLinks } = await useContentPageQuery(() => props.contentPath)

const sectionLabel = computed(() =>
  page.value?.title?.toUpperCase() ?? 'PAGE',
)

const labelClass
  = 'font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase'

const headlineClass
  = 'cn-font-heading mt-5 max-w-3xl text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-[2rem] lg:leading-[1.12]'
</script>

<template>
  <PageLayout
    :content-path="contentPath"
    :toc-links="tocLinks"
    :aria-label="page?.title"
  >
    <template #header>
      <p :class="labelClass">
        // {{ sectionLabel }}
      </p>
      <h1
        v-if="page?.description"
        :class="headlineClass"
      >
        {{ page.description }}
      </h1>
    </template>

    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </PageLayout>
</template>
