<template>
    <div id="blog_cards">
        <div 
            v-for="(meta, key) in post_metas"
            :key="key"
            class="blog_card"
        >
            <div 
                v-if="key % 2 === 0"
                class="left"
            >
            Left
            </div>
            <div 
                v-if="key % 2 !== 0"
                class="right"
            >
            Right
            </div>
            <h1>{{ meta.attributes.title }}</h1>
            <CardTags
                :tags="meta.attributes.tags"
            />
        </div>
    </div>
</template>

<script>
import CardTags from '@/components/CardTags.vue'
export default {
    name: 'BlogCards',
    props: {
        post_metas: Array,
    },
    components: {
        CardTags,
    },
}
</script>

<style scoped>
.blog_card {
    margin: 0 auto;
    height: 100px;
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;
    max-width: 400px;
}
@media screen and (max-width: 900px) {
    .blog_card {
        width: 75%;
    }
}
@media screen and (min-width: 900px) {
    .blog_card {
        width: 35%;
    }
}
.right {
    border-radius: 0 5px 5px 0;
    height: 100%;
    width: 33%;
    float: right;
    background-color: aquamarine;
}
.left {
    border-radius: 5px 0 0 5px;
    height: 100%;
    width: 33%;
    float: left;
    background-color: lightskyblue;
}
h1 {
    font-size: 15px;
}
</style>