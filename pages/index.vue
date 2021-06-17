<template>
  <div>
    <Hero />
    <ShortArticleList 
      :ArticlesMeta="articles"
    />
    <CurrentProjects />
  </div>
</template>

<script>
import Hero from '~/components/Hero'
import ShortArticleList from '~/components/ShortArticleList.vue'
import CurrentProjects from '~/components/CurrentProjects.vue'
export default {
  components: {
    Hero,
    ShortArticleList,
    CurrentProjects,
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