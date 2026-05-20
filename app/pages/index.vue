<script setup lang="ts">
import {
  Card,
  CardFooter,
} from '@/components/shadcn/ui/card'

type LanderAuthor = {
  name: string
}

type FeaturedPost = {
  category: string
  title: string
  date: string
  href: string
  authors: LanderAuthor[]
}

type SidebarPost = {
  category: string
  title: string
  date: string
  href: string
}

const cardFrameClass
  = 'h-full gap-0 rounded-none border border-border bg-transparent py-0 shadow-none ring-0'

const categoryClass
  = 'font-mono text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase'

const dateClass
  = 'shrink-0 font-mono text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase tabular-nums'

const featuredPost: FeaturedPost = {
  category: 'ANNOUNCEMENTS',
  title: 'Announcing Rolldown 1.0',
  date: 'MAY 7, 2026',
  href: '/posts',
  authors: [
    { name: 'Yuhao Zhao' },
    { name: 'sapphi-red' },
    { name: 'Yunfei He' },
    { name: 'Xiangjun He' },
    { name: 'Shuyuan Wang' },
  ],
}

const sidebarPosts: SidebarPost[] = [
  {
    category: 'UPDATES',
    title: 'Tales from the Void: April 2026 Recap',
    date: 'MAY 5, 2026',
    href: '/posts',
  },
  {
    category: 'ECOSYSTEM',
    title: 'How we made the Angular Compiler faster using AI',
    date: 'APR 10, 2026',
    href: '/posts',
  },
]

const authorLabel = featuredPost.authors
  .map(author => author.name)
  .join(', ')
  .replace(/, ([^,]+)$/, ', and $1')
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col">
    <section
      class="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:min-h-[calc(100svh-3.5rem)] lg:px-8 lg:py-14"
      aria-label="Latest writing"
    >
      <div class="grid flex-1 gap-4 lg:grid-cols-3 lg:gap-5">
        <Card
          :class="[cardFrameClass, 'lg:col-span-2 rounded-none']"
          size="sm"
        >
          <NuxtLink
            :to="featuredPost.href"
            class="group flex min-h-88 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-104 lg:min-h-full"
          >
            <div
              class="flex flex-1 flex-col justify-end gap-8 px-6 py-8 sm:gap-10 sm:px-8 sm:py-10 lg:px-10 lg:py-12"
            >
              <p :class="categoryClass">
                // {{ featuredPost.category }}
              </p>
              <h2
                class="cn-font-heading max-w-[16ch] text-balance text-4xl font-bold leading-[1.02] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {{ featuredPost.title }}
              </h2>
            </div>

            <CardFooter
              class="flex flex-col gap-4 rounded-none border-t border-border bg-transparent px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-6 lg:px-10"
            >
              <p class="min-w-0 font-mono text-xs leading-relaxed tracking-wide text-muted-foreground sm:text-sm">
                {{ authorLabel }}
              </p>
              <time
                :datetime="featuredPost.date"
                :class="dateClass"
              >
                {{ featuredPost.date }}
              </time>
            </CardFooter>
          </NuxtLink>
        </Card>

        <div class="grid gap-4 sm:grid-cols-2 lg:flex lg:min-h-full lg:flex-col lg:gap-5">
          <Card
            v-for="post in sidebarPosts"
            :key="post.title"
            :class="[cardFrameClass, 'min-h-56 lg:min-h-0 lg:flex-1 rounded-none']"
            size="sm"
          >
            <NuxtLink
              :to="post.href"
              class="group flex h-full min-h-56 flex-col justify-between px-6 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-7 sm:py-9 lg:min-h-0 lg:px-8 lg:py-10"
            >
              <div class="flex flex-col gap-6">
                <p :class="categoryClass">
                  // {{ post.category }}
                </p>
                <h3
                  class="cn-font-heading text-balance text-2xl font-bold leading-[1.08] tracking-tight text-foreground transition-opacity group-hover:opacity-80 sm:text-[1.65rem] lg:text-3xl"
                >
                  {{ post.title }}
                </h3>
              </div>
              <time
                :datetime="post.date"
                :class="dateClass"
              >
                {{ post.date }}
              </time>
            </NuxtLink>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>
