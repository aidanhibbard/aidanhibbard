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
            <v-card-subtitle>Latest update: {{project.updated_at.substr(0, 10)}}</v-card-subtitle>
            <v-card-text>{{project.description}}</v-card-text>
            <v-card-subtitle>Built with: {{project.language}}</v-card-subtitle>
            <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                >
                    Read More
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                >
                    Demo
                </v-btn>
                <v-btn
                    outlined
                    rounded
                    text
                >
                    <nuxt-link 
                        :to="project.html_url"
                    >
                    GitHub
                    </nuxt-link>
                </v-btn>
            </v-card-actions>
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
    margin-top: 0;
    text-align: center;
    margin-bottom: 0;
    padding-bottom: 0;
}
.v-card {
    margin: 0 auto;
    margin-bottom: 20px;
    max-width: 425px;
    border-radius: 5px;
}
.v-card__title {
    padding-top: 5px;
}
.v-card__subtitle {
    padding-bottom: 3px;
}
.v-card__text {
    padding-bottom: 5px;
}
</style>