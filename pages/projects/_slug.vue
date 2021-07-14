<template>
    <article>
        <nuxt-content :document="page" />
    </article>
</template>

<script>
import matter from 'gray-matter';
export default {
    async asyncData({ $axios, params }) {
        const resp = await $axios.get(`http://192.168.1.101:5000/`, { params: { project: params.slug } })
        const page = await resp.data
        matter(page)
        return {
            page,
        }
    },
}
</script>

<style scoped>

</style>