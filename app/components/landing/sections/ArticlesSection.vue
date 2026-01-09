<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import ArticleCard from '~/components/articles/ArticleCard.vue'
import { Empty, EmptyHeader } from '~/components/shadcn/ui/empty'

const { data: articles, status } = await useAsyncData(
  'landing-articles',
  async () => {
    return queryCollection('articles')
      .order('date', 'DESC')
      .limit(3)
      .select(
        'date',
        'description',
        'id',
        'tags',
        'stem',
        'title',
      )
      .all()
  },
)
</script>

<template>
  <section
    id="articles"
    class="py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-5xl">
      <div>
        <h2 class="font-serif text-4xl md:text-5xl font-bold mb-4">
          Recent Articles
        </h2>
        <p class="text-muted-foreground text-lg mb-12">
          Thoughts on design, development, and technologies
        </p>

        <Empty v-if="status === 'error'">
          <EmptyHeader>
            <p class="text-lg font-medium tracking-tight">
              No articles to display
            </p>
          </EmptyHeader>
        </Empty>

        <ul
          v-else
          class="space-y-12"
        >
          <li
            v-for="post in articles"
            :key="post.title"
          >
            <ArticleCard
              :post
            />
          </li>
        </ul>

        <div
          class="mt-12 flex justify-center"
        >
          <NuxtLink
            to="/articles"
            class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
          >
            View All Articles
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
