<template>
    <v-container>
        <h1>My Current Projects</h1>
        <br />
        <div v-if="ProjectsMeta">
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
                    text
                >
                    <nuxt-link 
                        class="ghbtn"
                        :to="{ name: 'projects-slug', params: { slug: project.name } }"
                    >
                    ReadMe
                    </nuxt-link>
                </v-btn>
                <v-btn
                    outlined
                    text
                >
                    Demo
                </v-btn>
                <v-btn
                    outlined
                    text
                >
                    <nuxt-link 
                        class="ghbtn"
                        :to="project.html_url"
                    >
                    GitHub
                    </nuxt-link>
                </v-btn>
            </v-card-actions>
        </v-card>
        </div>
        <div 
        class="ProjectsError"
        v-else
        >
        Could not fetch metadata from GitHub
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
.ghbtn:link {
    text-decoration: none;
    color: #3fb950;
}

.ghbtn:visited {
    text-decoration: none;
    color: #3fb950;
}

.ghbtn:hover {
    text-decoration: none;
    color: #3fb950;
}

.ghbtn:active {
    text-decoration: none;
    color: #3fb950;
}
.ProjectsError {
    text-align: center;
    color: red;
}
</style>