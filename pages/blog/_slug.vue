<template>
    <article>
        <h1>{{ article.title }}</h1>
            <TableOfContents :toc="article.toc" />
            <nuxt-content :document="article"/>
    </article>
</template>

<script>
import TableOfContents from '~/components/TableOfContents.vue'
export default {
    components: {
        TableOfContents,
    },
    async asyncData({ $content, params, error }) {
        try {
            const [article] = await $content({ deep: true })
                .where({ dir: `/${params.slug}` })
                .fetch()
            const related = await $content({ deep: true })
                .only(['title', 'image', 'path'])
                .where({ title: { $ne: article.title } })
                .sortBy('createdAt', 'desc')
                .limit(3)
                .fetch()
            return { article, related }
        } catch (err) {
            error({
                statusCode: 404,
                message: 'Page could not be found',
            })
        }
    },
}
</script>

<style scoped>

</style>