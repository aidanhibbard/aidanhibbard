<script setup lang="ts">
import ArticleCard from '~/components/articles/ArticleCard.vue'

const route = useRoute()
const state = reactive<{
  page: number
  query: string
  tags: string[]
  perPage: number
}>({
  page: 1,
  query: '',
  tags: [],
  perPage: 5,
})

const { data: articles } = await useAsyncData(
  route.path,
  async () => {
    const q = queryCollection('articles')
      .skip(
        (state.page - 1) * state.perPage,
      )
      .limit(state.perPage)
      .order('date', 'DESC')

    if (state.query) {
      q.where('title', 'LIKE', `%${state.query}%`)
    }

    if (state.tags.length) {
      for (const tag of state.tags) {
        // Match JSON array stringified content like ["nuxt","css"]
        q.where('tags', 'LIKE', `%"${tag}"%`)
      }
    }

    return q.all()
  },
  {
    watch: [
      () => state.page,
      () => state.query,
      () => state.tags,
    ],
  },
)
</script>

<template>
  <section
    id="articles"
    class="min-h-screen py-24 px-4 md:px-16"
  >
    <ul class="container mx-auto max-w-5xl">
      <li>
        <ArticleCard
          v-for="(a, idx) in articles"
          :key="a.title"
          :post="{
            ...a,
            index: idx,
          }"
          class="space-y-12"
        />
      </li>
    </ul>
  </section>
</template>
