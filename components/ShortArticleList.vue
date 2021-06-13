<template>
    <v-container>
        <h1> Recent Articles </h1>
        <br />
        <div>
            {{ArticlesMeta}}
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'ShortArticleList',
    props: {
        ArticlesMeta: Array,
    }
}
</script>

<style>

</style>