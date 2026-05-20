<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/shadcn/ui/button'
import { Separator } from '@/components/shadcn/ui/separator'
import { SidebarTrigger } from '@/components/shadcn/ui/sidebar'

const { primaryNav, socialLinks, isActive } = useNavigation()
</script>

<template>
  <header
    class="sticky top-0 z-50 flex h-14 shrink-0 items-center border-b border-border/50 bg-background/75 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:h-16"
  >
    <div class="mx-auto flex w-full max-w-7xl items-center gap-1 px-4 sm:px-6 lg:gap-2 lg:px-8">
      <SidebarTrigger class="-ml-1 md:hidden" />

      <NuxtLink
        to="/"
        class="cn-font-heading hidden truncate text-lg font-bold leading-none tracking-tight text-foreground transition-opacity hover:opacity-80 md:inline-block lg:text-xl"
      >
        Aidan Hibbard
      </NuxtLink>

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
                'rounded-none px-3 py-2 text-sm font-medium tracking-wide transition-colors',
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

      <div class="ml-auto flex items-center gap-2">
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
        <Separator
          orientation="vertical"
          class="mx-2 h-4 shrink-0 self-center"
        />
        <HeaderThemeToggle />
      </div>
    </div>
  </header>
</template>
