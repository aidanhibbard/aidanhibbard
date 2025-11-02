<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'

const { theme, toggleTheme } = useTheme()

const links = [
  { name: 'About', href: '#about' },
  { name: 'Articles', href: '#articles' },
  { name: 'Resume', href: '#resume' },
]

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <header
    class="flex h-16 shrink-0 z-50 fixed top-0 right-0 left-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/60 backdrop-blur-md"
  >
    <div
      class="flex w-full justify-between px-4 md:px-12"
    >
      <div class="flex items-center gap-2 md:w-1/3">
        <NuxtLink
          to="/"
          class="inline-flex items-center font-brand text-3xl md:text-4xl font-normal tracking-tight"
        >
          <span>Aidan Hibbard</span>
        </NuxtLink>
      </div>

      <nav class="hidden md:flex items-center gap-8">
        <button
          v-for="link in links"
          :key="link.name"
          class="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-current after:transition-all hover:after:w-full"
          @click="scrollToSection(link.href)"
        >
          {{ link.name }}
        </button>
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
