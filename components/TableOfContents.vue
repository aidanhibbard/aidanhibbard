<template>
    <section class="tableofcontents">
            <h2>In this article</h2>
        <div id="toc">
            <hr />
            <ul>
                <li
                v-for="link of toc"
                :key="link.id"
                :class="{ toc2: link.depth === 2, toc3: link.depth === 3 }"
                >
                <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
                </li>
            </ul>
            <hr />
        </div>
    </section>
</template>

<script>
export default {
    name: 'TableOfContents',
    props: ['toc'],
}
</script>

<style scoped>
h2 {
    font-weight: bold;
}
ul {
    list-style: none;
}
</style>