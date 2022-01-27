<template>
    <div id="blog">
        <div v-if="posts === null && error === null">
            Loading posts...
        </div>
        <div v-if="error !== null">
            Failed to load posts, please try refreshing.
            <br />
            <p>{{ error }}</p>
        </div>
        <div v-if="posts !== null">
            <BlogCards 
                :post_metas="posts"
            />
        </div>
    </div>
</template>

<script>
import BlogCards from '@/components/BlogCards.vue'
import axios from 'axios';
export default {
    name: 'articles',
    components: {
        BlogCards
    },
    data () {
        return {
            posts: null,
            error: null,
            page: 1,
            limit: 5,
        }
    },
    mounted () {
        axios.get(
            `http://localhost:3000/blog/posts/?page=${this.page}`
        ).then((response) => {
            this.posts = response.data;
        }).catch((err) => {
            this.error = err;
        });
    }
}
</script>

<style scoped>
#blog {
    padding-top: 15px;
}
</style>