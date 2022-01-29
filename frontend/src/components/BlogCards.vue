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
            :style="{
                'background-image': `url(${meta.attributes.image})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            }"
        >
        </div>
        <div 
            v-if="key % 2 !== 0"
            class="right"
            :style="{
                'background-image': `url(${meta.attributes.image})`,
                'background-repeat': 'no-repeat',
                'background-size': '100% 100%'
            }"
        >
        </div>
        <h1>
            {{ 
                meta.attributes.title
            }}
        </h1>
        <p>
            {{
                meta.attributes.desc
            }}
        </p>
        <BlogLinks
            :links="meta.attributes.links"
        />
        </div>
    </div>
</template>

<script>
import BlogLinks from '@/components/BlogLinks'
export default {
    name: 'BlogCards',
    props: {
        post_metas: Array,
    },
    components: {
        BlogLinks,
    },
}
</script>

<style scoped>
.blog_card {
    margin: 0 auto;
    height: 100px;
    border-radius: 5px;
    margin-bottom: 10px;
    max-width: 400px;
    padding: 3px;
    background: rgb(66,185,131);
    background: linear-gradient(306deg, rgba(66,185,131,1) 0%, rgba(135,206,250,1) 100%);
}
@media screen and (max-width: 900px) {
    .blog_card {
        width: 85%;
    }
}
@media screen and (min-width: 900px) {
    .blog_card {
        width: 35%;
    }
}
.right {
    border-radius: 5px;
    height: 100%;
    width: 33%;
    float: right;
}
.left {
    border-radius: 5px;
    height: 100%;
    width: 33%;
    float: left;
}
h1 {
    font-size: 15px;
}
p {
    font-size: 13px;
    margin-bottom: 5px;
}
</style>