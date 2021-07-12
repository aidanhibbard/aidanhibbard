<template>
    <article>
        {{page}}
    </article>
</template>

<script>
import Markdown from '@nuxt/content/parsers/markdown'
import { getDefaults, processMarkdownOptions } from '@nuxt/content/lib/utils'
export default {
    async asyncData({ $axios, params }) {
        const resp = await $axios.get(`http://192.168.1.101:5000/`)
        const page = await parseMarkdown(resp.data)
        console.log(page)
        return {
            page,
        }
    },
    methods : {
        parseMarkdown: async function(md) {
            const options = getDefaults()
            processMarkdownOptions(options)
            return new Markdown(options.markdown).toJSON(md)
        },
    },
}
</script>

<style scoped>

</style>