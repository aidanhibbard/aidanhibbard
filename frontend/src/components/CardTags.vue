<template>
    <div id="card_tags">
        <span
            v-for="(tag, key) in tags"
            :key="key"
            class="tag"
        >
            {{ tag }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'CardTags',
    props: {
        tags: Array,
    },
}
</script>

<style scoped>
.tag {
    font-size: 12px;
    padding: 2px;
    border: 1px solid black;
    border-radius: 5px;
}
</style>