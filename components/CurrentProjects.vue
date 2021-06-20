<template>
    <v-container>
        <h1>Current Projects</h1>
        <br />
        <div>
            <ul>
                <li
                    v-for="(project, index) in ProjectsMeta"
                    :key="index"
                >
                {{project.name}}
                <br />
                {{project.description}} {{project.language}}
                <br />
                {{project.html_url}}
                <br />
                {{project.updated_at}}
                <br />
                </li>
            </ul>
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
    text-align: center;
}
ul {
    list-style: none;
}
</style>