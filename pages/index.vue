<template>
  <div>
    <Hero />
    <ShortArticleList 
      :ArticlesMeta="articles"
    />
  </div>
</template>

<script>
import Hero from '~/components/Hero'
import ShortArticleList from '~/components/ShortArticleList.vue'
export default {
  components: {
    Hero,
    ShortArticleList,
  },
    async asyncData({ $content, params }) {
    try {
      const articles = await $content({ deep: true })
        .only(['title', 'desc', 'date', 'tags', 'a'])
        .sortBy('date')
        .limit(3)
        .fetch()
      return { articles }
    } catch (err) {
      return { err }
    }
  },
}
</script>

<style scoped>
</style>