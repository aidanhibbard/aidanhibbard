<template>
  <div>
    <Hero />
    <div
    id="FullError"
    v-if="err"
    >
    Could not load content please refresh
    </div>
    <div v-else>
    <ShortArticleList 
      :ArticlesMeta="articles"
    />
    <CurrentProjects 
    :ProjectsMeta="ghdata"
    />
    </div>
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
    async asyncData({ $content, params, $axios }) {
      try {
        const ghdata = await $axios.$get('https://api.github.com/users/aidanhibbard/repos')
        const articles = await $content({ deep: true })
          .only(['title', 'desc', 'date', 'tags', 'a'])
          .sortBy('date')
          .limit(3)
          .fetch()
        return { 
          articles,
          ghdata,
        }
      } catch (err) {
        return { err }
      }
  },
}
</script>

<style scoped>
#FullError {
  margin-top: 45px;
  text-align: center;
  color: red;
}
</style>