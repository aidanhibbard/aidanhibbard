<script setup lang="ts">
import ArticleCard from '~/components/articles/ArticleCard.vue'

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

const { data } = await useAsyncData(
  `blog-articles`,
  () => {
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
        q.where('tags', 'LIKE', `%"${tag}"%`)
      }
    }

    return q.all()
  },
)
</script>

<template>
  <section
    id="about"
    class="min-h-screen py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-4xl">
      <ul
        class="container mx-auto max-w-5xl"
      >
        <li
          v-for="(a, idx) in data ?? []"
          :key="a.title"
        >
          <ArticleCard
            :post="{
              ...a,
              index: idx,
            }"
            class="space-y-12"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
