<template>
    <v-carousel 
    hide-delimiters 
    cycle 
    :show-arrows="false"
    >
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        >
            <v-card
            >
            </v-card>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
import ad from '~/assets/ad.png'
import HeroSlideOne from '~/assets/mountain.jpg'
export default {
    name: 'Hero',
    data () {
        return {
            items: [
                {
                    src: ad,
                },
                {
                    src: ad,
                },
                {
                    src: HeroSlideOne,
                },
                {
                    src: ad,
                },
            ],
        }
    },
}
</script>

<style scoped>
.v-carousel {
    margin-top: 20px;
}
.v-card {
    margin: 0 auto;
    width: 80%;
    height: 150px;
}
</style>