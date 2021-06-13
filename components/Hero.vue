<template>
    <v-carousel 
    hide-delimiters 
    cycle height="100px"
    :show-arrows="false"
    >
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        >
            <v-card
            color="#385F73"
            dark
            >
            <v-img 
            :src="require(`~/assets/${item.src}`)"
            />
            </v-card>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    name: 'Hero',
    data () {
        return {
            items: [
                {
                    src: 'mountain.jpg',
                },
                {
                    src: 'mountain.jpg',
                },
                {
                    src: 'mountain.jpg',
                },
                {
                    src: 'mountain.jpg',
                },
            ],
        }
    },
}
</script>

<style scoped>
.v-carousel {
    margin-top: 15px;
}
.v-card {
    margin: 0 auto;
    width: 80%;
    height: 100px;
}
</style>