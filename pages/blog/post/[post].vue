<template>
    <div>
        <Html :lang="'en-US'">
        <Head>
            <Title>{{ dynamic }} title</Title>
            <Meta name="description" :content="`My page's ${dynamic} description`" />
        </Head>
        </Html>
    </div>
</template>

<script>
export default {
    data: () => ({ 

    })
}
</script>