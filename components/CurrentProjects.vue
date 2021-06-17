<template>
    <v-container>
        <h1>Current Projects</h1>
        <br />
        <div>
            {{ProjectsMeta}}
        </div>
    </v-container>
</template>

<script>
export default {
    name: 'CurrentProjects',
    props: {
        ProjectsMeta: Array,
    }
}
</script>

<style scoped>

</style>