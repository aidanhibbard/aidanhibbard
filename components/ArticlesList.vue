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
                'date'
            ])
            .find()
    state.loading = false;
};
fetchArticles();
</script>

<template>
    <div>
        {{ state.articles }}
        <br>
        {{ pages }}
    </div>
</template>

<style>
    
</style>