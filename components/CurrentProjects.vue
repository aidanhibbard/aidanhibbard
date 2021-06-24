<template>
    <v-container>
        <h1>Current Projects</h1>
        <br />
        <v-card
            v-for="(project, index) in ProjectsMeta"
            :key="index"
            elevation="6"
        >
            <v-card-title>{{project.name}}</v-card-title>
            <v-card-subtitle>{{project.updated_at}}</v-card-subtitle>
            <v-card-text>{{project.description}}</v-card-text>
        </v-card>
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
h1 {
    text-align: center;
}
</style>