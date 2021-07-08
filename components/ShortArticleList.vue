<template>
    <v-container>
        <h1>Recent Articles</h1>
        <br />
        <div v-if="ArticlesMeta">
            <v-card
                v-for="(article, index) in ArticlesMeta"
                :key="index"
                elevation="6"
            >
                <v-card-title>{{article.title}}</v-card-title>
                <v-card-subtitle>{{article.date.substr(0, 10)}}</v-card-subtitle>
                <v-card-text>{{article.desc}}</v-card-text>
                <v-card-actions>
                    <nuxt-link :to="{ name: 'blog-slug', params: { slug: article.a } }">
                        <v-btn
                            outlined
                            text
                        >
                            Read More
                        </v-btn>
                    </nuxt-link>
                </v-card-actions>
            </v-card>
        </div>
        <div
        class="ArticlesError"
        v-else
        >
        Could not fetch articles
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

<style scoped>
h1 {
    margin-top: 45px;
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 0;
}
.v-card {
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 425px;
    border-radius: 5px;
}
.v-card__title {
    padding-top: 5px;
    padding-bottom: 0;
}
.v-card__subtitle {
    margin-top: 0;
    padding-top: 0;
    padding-bottom: 3px;
}
.v-card__text {
    padding-bottom: 5px;
}
.ArticlesError {
    text-align: center;
    color: red;
}
</style>