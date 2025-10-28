<script setup lang="ts">
import { SidebarTrigger } from '@/shadcn/components/ui/sidebar'
import { Moon, Sun } from 'lucide-vue-next'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <header
    class="flex h-16 shrink-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
  >
    <div
      class="flex w-full items-center px-4 md:px-12"
    >
      <div class="flex items-center gap-2 md:w-1/3">
        <SidebarTrigger class="md:hidden" />
        <NuxtLink
          to="/"
          class="hidden md:inline-flex items-center font-semibold"
        >
          <span>Aidan Hibbard</span>
        </NuxtLink>
      </div>

      <nav
        class="hidden md:flex w-1/3 items-center justify-center gap-6 text-sm"
      >
        <NuxtLink
          to="/about"
          class="hover:text-foreground/90 text-foreground/70"
        >
          About
        </NuxtLink>
        <NuxtLink
          to="/blog"
          class="hover:text-foreground/90 text-foreground/70"
        >
          Blog
        </NuxtLink>
        <NuxtLink
          to="/resume"
          class="hover:text-foreground/90 text-foreground/70"
        >
          Resume
        </NuxtLink>
      </nav>

      <div
        class="flex items-center justify-end gap-2 ml-auto md:ml-0 md:w-1/3"
      >
        <button
          type="button"
          aria-label="Toggle theme"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          @click="toggleTheme"
        >
          <Sun
            v-if="theme === 'light'"
            class="h-4 w-4"
          />
          <Moon
            v-else
            class="h-4 w-4"
          />
        </button>
      </div>
    </div>
  </header>
</template>
