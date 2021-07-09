<template>
    <article>
        <nuxt-content :document="page" />
    </article>
</template>

<script>
import Markdown from '@nuxt/content/parsers/markdown'
import { getDefaults, processMarkdownOptions } from '@nuxt/content/lib/utils'
export default {
    async asyncData({ $axios, params }) {
        const resp = await $axios.get(`https://raw.githubusercontent.com/AidanHibbard/${params.slug}/main/README.md`)
        const page = await this.parseMarkdown(resp.data)
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