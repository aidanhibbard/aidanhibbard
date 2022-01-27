<template>
    <div id="blog_cards">
        <div 
            v-for="(meta, key) in post_metas"
            :key="key"
            class="blog_card"
        >
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogCards',
    props: {
        post_metas: Array
    }
}
</script>

<style scoped>
.blog_card {
    margin: 0 auto;
    height: 100px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
}
@media screen and (max-width: 480px) {
    .blog_card {
        width: 75%;
    }
}
@media screen and (min-width: 480px) {
    .blog_card {
        width: 35%;
    }
}
</style>