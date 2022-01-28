<template>
    <div id="article_links">
        <a 
            v-for="(link, key) in links"
            :key="key"
            class="article_link"
            :href="link"
        >
            <span v-if="key === 0">
                Read
            </span>
            <span v-if="key === 1">
                Demo
            </span>
            <span v-if="key === 2">
                Github
            </span>
        </a>
    </div>
</template>

<script>
export default {
    name: 'ArticleLinks',
    props: {
        links: Array,
    },
}
</script>

<style scoped>
a {
    font-weight: bold;
    font-size: 15px;
    color: #2c3e50;
    padding: 5px;
}
</style>