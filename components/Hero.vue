<template>
    <v-carousel hide-delimiters>
        <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        >
            <v-card
            color="#385F73"
            dark
            >
                <v-card-title class="text-h5">
                Unlimited music now
                </v-card-title>

                <v-card-subtitle>Listen to your favorite artists and albums whenever and wherever, online and offline.</v-card-subtitle>

                <v-card-actions>
                <v-btn text>
                    Listen Now
                </v-btn>
                </v-card-actions>
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
                    src: 'https://cdn.cosmicjs.com/b3c91580-ca26-11eb-ba89-e7f98c8c358b-Frame-2.png',
                },
                {
                    src: 'https://cdn.cosmicjs.com/b3c91580-ca26-11eb-ba89-e7f98c8c358b-Frame-2.png',
                },
                {
                    src: 'https://cdn.cosmicjs.com/b3c91580-ca26-11eb-ba89-e7f98c8c358b-Frame-2.png',
                },
                {
                    src: 'https://cdn.cosmicjs.com/b3c91580-ca26-11eb-ba89-e7f98c8c358b-Frame-2.png',
                },
            ],
        }
    },
}
</script>

<style scoped>
.v-carousel {
    margin-top: 15px;
    height: 250px;
}
</style>