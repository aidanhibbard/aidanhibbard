<script setup lang='ts'>
import type { Toc } from '@nuxt/content';
import slugify from 'slugify';

interface Meta {
  body: {
    toc: Toc;
  };
}

const { params } = useRoute();
const { data: article } = await useAsyncData(
  'article',
  () =>
    queryCollection('articles')
      .where('stem', '=', `articles/${params.stem}`)
      .first()
);
if (!article)
  throw createError({
    statusCode: 404,
    message: 'Could not find given article'
  });
useSeoMeta({
  title: article.value!.title,
  ogTitle: article.value!.title,
  description: article.value!.description,
  ogDescription: article.value!.description
});

const items = computed(() =>
  tocToItems(
    (article.value!.meta as unknown as Meta).body.toc
  )
);
</script>

<template>
  <UContainer class="px-4 py-6 mx-auto md:max-w-screen-xl">
    <div
      class="grid grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)_200px] gap-6 items-start"
    >
      <!-- Left sidebar (hidden below lg) -->
      <aside
        class="hidden lg:block"
        aria-label="related content"
      >
        <nav class="space-y-4">
          <h2 class="text-lg font-semibold mb-2">
            Related
          </h2>
          <ul class="space-y-1 text-sm">
            <li><NuxtLink to="/something">Link One</NuxtLink></li>
            <li><NuxtLink to="/something-else">Link Two</NuxtLink></li>
            <li><NuxtLink to="/another">Link Three</NuxtLink></li>
          </ul>
        </nav>
      </aside>

      <!-- Main article -->
      <article class="prose max-w-none mx-auto w-full min-w-[40ch]">
        <!-- Title -->
        <h1 class="text-3xl font-bold mb-4 dark:text-white text-gray-900">
          {{ article!.title }}
        </h1>

        <!-- Conditional Featured Image -->
        <CldImage
          v-if="article!.image"
          :src="article!.image"
          :alt="article!.title"
          width="800"
          height="450"
          class="w-full rounded-xl shadow-md mb-8 mx-auto"
        />

        <!-- Meta info -->
        <div class="space-y-4">
          <div class="flex flex-wrap items-center text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
            <UIcon
              name="mdi:calendar"
              size="18"
              class="mr-1"
            />
            <time>{{ new Date(article!.publishedAt).toLocaleDateString() }}</time>
          </div>

          <div class="flex flex-wrap gap-2 text-xs sm:text-sm">
            <NuxtLink
              v-for="(tag, index) in article!.tags"
              :key="tag"
              :to="`/articles?tags=${tag}`"
              class="inline-flex items-center space-x-2 no-underline hover:underline dark:text-white text-gray-900"
            >
              <UIcon
                :name="`catppuccin:${tag.toLowerCase()}`"
                size="20"
              />
              <span>
                {{ tag }}<span v-if="index < article!.tags.length - 1">,</span>
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- Content -->
        <div class="mt-6">
          <ContentRenderer :value="article!.meta" />
        </div>
      </article>

      <!-- Right sidebar (hidden below lg) -->
      <aside
        class="hidden lg:block relative h-full"
        aria-label="table of content"
      >
        <UTree
          :items="items"
          class="sticky top-20 pl-4 text-sm text-gray-600 dark:text-gray-400"
          color="neutral"
          variant="ghost"
        >
          <template #item="{ item }">
            <NuxtLink :to="`#${slugify(item.label!).toLowerCase()}`">
              {{ item.label }}
            </NuxtLink>
          </template>
        </UTree>
      </aside>
    </div>
  </UContainer>
</template>
