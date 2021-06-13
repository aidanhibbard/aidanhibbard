<template>
    <v-carousel hide-delimiters>
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="require(`~/assets/${item.src}`)"
        ></v-carousel-item>
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

</style>