<template>
    <navbar />
    <slot />
</template>

<script>
import navbar from '../components/navbar.vue';
export default {
    components: {
        navbar,
    },
};
</script>

<style>

</style>