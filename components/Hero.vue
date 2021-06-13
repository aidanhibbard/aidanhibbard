<template>
    <v-carousel 
    hide-delimiters 
    cycle 
    height="100px"
    :show-arrows="false"
    >
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        >
            <v-card
            dark
            :style="{ 
                backgroundImage: `url(${item.src})`,
            }"
            style="
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            "
            >
            </v-card>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import HeroSlideOne from '~/assets/mountain.jpg'
export default {
    name: 'Hero',
    data () {
        return {
            items: [
                {
                    src: HeroSlideOne,
                },
                {
                    src: HeroSlideOne,
                },
                {
                    src: HeroSlideOne,
                },
                {
                    src: HeroSlideOne,
                },
            ],
        }
    },
}
</script>

<style scoped>
.v-carousel {
    margin-top: 30px;
}
.v-card {
    margin: 0 auto;
    width: 80%;
    height: 100px;
}
</style>