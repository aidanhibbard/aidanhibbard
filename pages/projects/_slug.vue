<template>
    <article>
        <nuxt-content :document="page" />
    </article>
</template>

<script>
export default {
    async asyncData({ $axios, params }) {
        const resp = await $axios.get(`http://192.168.1.101:5000/`, { params: { project: params.slug } })
        const page = await resp.data
        return {
            page,
        }
    },
}
</script>

<style scoped>
article {
    margin-top: 50px;
}
</style>