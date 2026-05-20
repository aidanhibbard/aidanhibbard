<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { Card } from '@/components/shadcn/ui/card'
import { formatPostDate } from '@/utils/format-post-date'

const cardFrameClass
  = 'h-full gap-0 rounded-none border border-border bg-card/40 py-0 shadow-none ring-0 transition-colors hover:border-primary/35'

const categoryClass
  = 'font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase'

const dateClass
  = 'shrink-0 font-mono text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase tabular-nums'

const sectionCtaLinkClass
  = 'group flex items-center justify-between border border-border px-6 py-4 font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-7 lg:px-8'

const sectionCtaArrowClass
  = 'size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5'

const { primaryNav } = useNavigation()

const blogPath = primaryNav.find(item => item.label === 'Blog')?.to ?? '/posts'
const aboutPath = primaryNav.find(item => item.label === 'About')?.to ?? '/about'
const resumePath = primaryNav.find(item => item.label === 'Resume')?.to ?? '/resume'

const {
  landing,
  currentRole,
  pastRoles,
  featuredPost,
  sidebarPosts,
  hasPosts,
} = useLandingContent()
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col">
    <section
      class="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 md:min-h-[calc(100svh-4rem)] lg:px-8 lg:py-14"
      aria-label="Latest writing"
    >
      <div
        v-if="hasPosts"
        class="grid flex-1 gap-4 lg:grid-cols-3 lg:gap-5"
      >
        <Card
          v-if="featuredPost"
          :class="[cardFrameClass, 'lg:col-span-2 rounded-none']"
          size="sm"
        >
          <NuxtLink
            :to="featuredPost.path"
            class="group flex min-h-88 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-104 lg:min-h-full"
          >
            <div
              class="flex flex-1 flex-col justify-end gap-8 px-6 py-8 sm:gap-10 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            >
              <h2
                class="cn-font-heading max-w-[16ch] text-balance text-4xl font-bold leading-[1.02] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {{ featuredPost.title }}
              </h2>
              <time
                v-if="featuredPost.date"
                :datetime="featuredPost.date"
                :class="dateClass"
              >
                {{ formatPostDate(featuredPost.date) }}
              </time>
            </div>
          </NuxtLink>
        </Card>

        <div class="grid gap-4 sm:grid-cols-2 lg:flex lg:min-h-full lg:flex-col lg:gap-5">
          <Card
            v-for="post in sidebarPosts"
            :key="post.path"
            :class="[cardFrameClass, 'min-h-56 lg:min-h-0 lg:flex-1 rounded-none']"
            size="sm"
          >
            <NuxtLink
              :to="post.path"
              class="group flex h-full min-h-56 flex-col justify-between px-6 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-7 sm:py-9 lg:min-h-0 lg:px-8 lg:py-10"
            >
              <h3
                class="cn-font-heading text-balance text-2xl font-bold leading-[1.08] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-[1.65rem] lg:text-3xl"
              >
                {{ post.title }}
              </h3>
              <time
                v-if="post.date"
                :datetime="post.date"
                :class="dateClass"
              >
                {{ formatPostDate(post.date) }}
              </time>
            </NuxtLink>
          </Card>

          <NuxtLink
            :to="blogPath"
            :class="[sectionCtaLinkClass, 'sm:col-span-2 lg:col-span-1']"
          >
            <span>View all posts</span>
            <ArrowRight :class="sectionCtaArrowClass" />
          </NuxtLink>
        </div>
      </div>

      <div
        v-else
        class="flex flex-1 flex-col justify-center"
      >
        <NuxtLink
          :to="blogPath"
          :class="sectionCtaLinkClass"
        >
          <span>View all posts</span>
          <ArrowRight :class="sectionCtaArrowClass" />
        </NuxtLink>
      </div>
    </section>

    <section
      v-if="landing"
      class="mx-auto w-full max-w-7xl border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
      aria-label="About"
    >
      <div class="grid gap-4 lg:grid-cols-3 lg:gap-5">
        <div class="lg:col-span-2">
          <p :class="categoryClass">
            // ABOUT
          </p>
          <h2
            class="cn-font-heading mt-6 scroll-m-20 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {{ landing.aboutHeadline }}
          </h2>
          <p class="mt-8 text-xl leading-relaxed text-muted-foreground">
            {{ landing.aboutLead }}
          </p>
          <p class="mt-6 leading-7 text-muted-foreground">
            {{ landing.aboutBody }}
          </p>
        </div>

        <NuxtLink
          :to="aboutPath"
          :class="[sectionCtaLinkClass, 'lg:self-end']"
        >
          <span>Read the full story</span>
          <ArrowRight :class="sectionCtaArrowClass" />
        </NuxtLink>
      </div>
    </section>

    <section
      v-if="currentRole"
      class="mx-auto w-full max-w-7xl border-t border-border px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
      aria-label="Resume"
    >
      <p :class="categoryClass">
        // RESUME
      </p>

      <article
        class="mt-6 max-w-2xl lg:mt-8"
        aria-label="Current role"
      >
        <time
          :datetime="currentRole.period"
          :class="dateClass"
        >
          {{ currentRole.period }}
        </time>
        <h2
          class="cn-font-heading mt-3 text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
        >
          {{ currentRole.title }}
        </h2>
        <p class="mt-2 font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase">
          {{ currentRole.organization }}
        </p>
        <p class="mt-4 leading-7 text-muted-foreground">
          {{ currentRole.summary }}
        </p>
      </article>

      <div
        v-if="pastRoles.length > 0"
        class="mt-10 lg:mt-12"
        aria-label="Previous roles"
      >
        <p :class="categoryClass">
          // PREVIOUSLY
        </p>
        <ol
          class="mt-6 flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-10"
        >
          <li
            v-for="entry in pastRoles"
            :key="`${entry.period}-${entry.title}-${entry.organization}`"
            class="min-w-0 lg:border-l lg:border-border lg:pl-10 lg:first:border-l-0 lg:first:pl-0"
          >
            <time
              :datetime="entry.period"
              :class="dateClass"
            >
              {{ entry.period }}
            </time>
            <p class="cn-font-heading mt-3 text-balance text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg">
              {{ entry.title }}
            </p>
            <p class="mt-1.5 font-mono text-[11px] font-medium tracking-[0.24em] text-muted-foreground uppercase">
              {{ entry.organization }}
            </p>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ entry.summary }}
            </p>
          </li>
        </ol>
      </div>

      <div class="mt-10 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
        <NuxtLink
          :to="resumePath"
          :class="[sectionCtaLinkClass, 'lg:col-start-3']"
        >
          <span>View full resume</span>
          <ArrowRight :class="sectionCtaArrowClass" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
