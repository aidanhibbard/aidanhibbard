<script setup>
useHead({
    title: 'Aidan Hibbard | Articles',
    meta: [
        { name: 'description', content: 'My amazing site.' },
    ],
    bodyAttrs: {
        class: '',
    },
    script: [ 

    ],
});
const state = reactive({ 
    page: 0,
    limit: 5,
    query: '',
});
</script>

<template>
    <ArticlesList 
        :limit="state.limit"
        :page="state.page"
        :query="state.query"
    />
</template>

<style>
    
</style>