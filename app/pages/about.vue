<script setup lang="ts">
import { motion } from 'motion-v'
import {
  ArrowRight,
} from 'lucide-vue-next'
</script>

<template>
  <section
    id="about"
    class="min-h-screen py-24 px-4 md:px-16"
  >
    <div class="container mx-auto max-w-4xl">
      <motion.article
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :viewport="{ once: true }"
        :transition="{ duration: 0.6 }"
      >
        <ProseH1>About</ProseH1>
        <ProseP>
          Born, and raised in the beautiful mountain town of Bend, Oregon I've been incredibly fortunate to live in a tech focused community that is passionate about the outdoors.
        </ProseP>
        <figure class="my-8">
          <NuxtImg
            src="https://res.cloudinary.com/dlnxtpill/image/upload/v1764131020/IMG_0714_mhg7cq.jpg"
            class="w-full rounded-lg"
            alt="Broken Top, Oregon"
            width="800"
            height="600"
            sizes="(max-width: 768px) 100vw, 768px"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="mt-2 text-sm text-muted-foreground">
            No Name Lake near the peak of Broken Top
          </figcaption>
        </figure>
        <ProseP>
          I picked up web development back in the twenty-pre-teens with Adobe Dreamweaver, and Java backends. It felt so empowering to be able to build services that anyone could access.
          Picking up JQuery, it was so fun to build interactive sites, didn't have to be anything impressive, but buttons that made things spin, or playing with tags like marquee.
          Web back then was already a growing, and leading technology so I knew it was something I should stick with.
          Flash forward to today, and now we can build things like games, full native apps, and more.
        </ProseP>
        <ProseP>
          Once Node backends became more popular, and TypeScript was picking up in adoption it was a very smooth transition over.
          JavaScript syntax, with the strict types that you can get from Java? Count me in.
        </ProseP>
        <ProseP>
          I started my software career as a QA engineer writing E2E tests using Selenium, Ruby, and Rails it was a cool expierence.
          It was in that role where I gained a deep respect for best practices, UX, accessability, and those are values I carry in my development still.
        </ProseP>
        <ProseP>
          Eventually I started picking up some developer tickets to get a taste of what professional development was like.
          I never wanted to stop.
          Swiftly they moved me onto a team of three developers including myself, and I spent years learning from incredible senior developers.
          We managed a "fleet" of Rails apps all setup to run as microservices in API mode, and used gRPC, as well as google pubsub to handle cross communications.
          This was one of the most fun stacks I had ever worked on, you'd have nine terminal sessions open watching logs between services to find an issue in the transformation pipeline.
          I had the incredible oppurtunity to work with some DevOps engineers who hosted our apps in Kubernetes, managed our CI, and helped review our SQL in GCP for long running queries.
          Getting hands on expierence with Kubernetes at enterprise scale, learning how to setup IAC, and setting up CI in complex systems are skills I still value to these days.
        </ProseP>
        <ProseP>
          Since then I have had an absolute pleasure working on unique, and intricate projects as well as meting some of the best developers.
        </ProseP>
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :viewport="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.3 }"
          class="my-8 flex justify-center"
        >
          <NuxtLink
            to="/resume"
            class="group inline-flex items-center gap-2 text-lg font-medium hover:text-foreground transition-colors"
          >
            View my full experience
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </motion.div>
      </motion.article>
    </div>
  </section>
</template>
