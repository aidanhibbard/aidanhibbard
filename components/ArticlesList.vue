<script setup>
const props = defineProps({
    page: {
        type: Number,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    query: {
        type: String,
        required: false
    }
});
const state = reactive({
    loading: false,
    articles: null
});
// Nuxt Content doesn't send back a count of items matching your query
// So you never know how many pages you'll have
// This may be taxing so revisit this
// Say we have 23 articles, and a 5 limit
// We'd expect 5 pages
// So always round up
const articlesCount = (await queryContent('articles').find()).length;
const pages = Math.ceil(articlesCount / props.limit);

const fetchArticles = async () => {
    state.loading = true;
    state.articles = await queryContent('articles')
            .where({
                title: {

                },
                tags: {

                }
            })
            .skip(props.limit * props.page)
            .limit(props.limit)
            .sort({ date: -1 })
            .only([
                '_path',
                'title',
                'description',
                'date',
                'tags'
            ])
            .find()
    state.loading = false;
};
fetchArticles();
</script>

<template>
  <div class="card-container">
    <div v-for="article in state.articles" :key="article._path" class="card">
      <div class="card-header">
        <h2 class="card-title">{{ article.title }}</h2>
        <p class="card-date">{{ new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      </div>
      <div class="card-body">
        <p>{{ article.description }}</p>
        <div class="tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card {
        margin: 1rem;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        background-color: #fff;
        max-width: 500px;
        width: 100%;
        transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }

    .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .card-date {
        font-size: 1rem;
        color: #666;
    }

    .card-body {
        font-size: 1.2rem;
        line-height: 1.5;
        margin-bottom: 1rem;
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
    }

    .tag {
        margin-right: 0.5rem;
        margin-bottom: 0.5rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        background-color: #f1f1f1;
        font-size: 0.8rem;
        line-height: 1;
    }
</style>