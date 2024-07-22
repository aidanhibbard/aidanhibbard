<script setup lang="ts">
const { data } = await useAsyncData(
  'articles',
  () => queryContent('articles')
    .sort({ publishedAt: -1 })
    .limit(15)
    .find()
)

const state = reactive({
  query: '',
  perPage: 15,
  page: 1,
  foundContent: data,
});

watch(() => state.query, async () => {
  if (state.query) {
    const found = await queryContent('articles')
      .where({ title: { $icontains: state.query } })
      .limit(state.perPage)
      .find();
    state.foundContent = found;
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="mb-4">
      <input
        v-model="state.query"
        type="text"
        placeholder="Search articles..."
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
      >
    </div>
    <ul class="flex flex-col py-8">
      <li
        v-for="a in data"
        :key="a.title"
      >
        <article
          class="flex max-w-xl flex-col items-start justify-between py-4"
        >
          <div class="flex items-center gap-x-4 text-xs">
            <span class="text-gray-500">Started <time datetime="2020-03-16">Mar 16, 2020</time></span>
            <NuxtLink
              v-for="t in a.tags.slice(0, 3)"
              :key="t"
              :to="`/projects?tag=${t.toLowerCase()}`"
              class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              {{ t }}
            </NuxtLink>
          </div>
          <div class="group relative">
            <h3 class="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
              <a href="#">
                <span class="absolute inset-0" />
                {{ a.title }}
              </a>
            </h3>
            <p class="mt-5 line-clamp-3 text-md leading-6 text-gray-600">
              {{ a.desc }}
            </p>
          </div>
        </article>
      </li>
    </ul>
    <AppPagination />
  </div>
</template>

<style scoped>
body {
  background-color: white;
  color: #1a202c; /* gray-900 */
}
</style>
