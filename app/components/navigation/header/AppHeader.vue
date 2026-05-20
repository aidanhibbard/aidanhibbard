<script setup lang="ts">
import { Github, Linkedin } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/ui/button'
import { SidebarTrigger } from '@/components/shadcn/ui/sidebar'

type NavItem = {
  label: string
  to: string
}

const primaryNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/posts' },
  { label: 'Resume', to: '/resume' },
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/aidanhibbard',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aidan-hibbard/',
    icon: Linkedin,
  },
] as const

const route = useRoute()

const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-border/50 bg-background/75 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
  >
    <div class="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:px-6">
      <div class="flex min-w-0 flex-1 items-center gap-2 md:flex-initial">
        <SidebarTrigger class="md:hidden" />
        <NuxtLink
          to="/"
          class="hidden truncate text-sm font-semibold tracking-tight transition-colors hover:text-foreground/80 md:inline-block"
        >
          Aidan Hibbard
        </NuxtLink>
      </div>

      <nav
        class="hidden flex-1 justify-center md:flex"
        aria-label="Main"
      >
        <ul class="flex items-center gap-1">
          <li
            v-for="item in primaryNav"
            :key="item.to"
          >
            <NuxtLink
              :to="item.to"
              :class="cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive(item.to)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex flex-1 items-center justify-end gap-0.5 md:flex-initial">
        <HeaderThemeToggle />
        <Button
          v-for="link in socialLinks"
          :key="link.href"
          variant="ghost"
          size="icon-sm"
          as-child
        >
          <NuxtLink
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <component
              :is="link.icon"
              class="size-4"
            />
            <span class="sr-only">{{ link.label }}</span>
          </NuxtLink>
        </Button>
      </div>
    </div>
  </header>
</template>
