<template>
    <v-container>
        <h1> Recent Articles </h1>
        <br />
                <v-card
                    v-for="(article, index) in ArticlesMeta"
                    :key="index"
                    elevation="6"
                >
                    <v-card-title>{{article.title}}</v-card-title>
                    <v-card-subtitle>{{article.date.substr(0, 10)}}</v-card-subtitle>
                    <v-card-text>{{article.desc}}</v-card-text>
                </v-card>
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

<style scoped>
h1 {
    text-align: center;
}
.v-card {
    margin-bottom: 20px;
    max-width: 425px;
}
</style>