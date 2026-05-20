<script setup lang="ts">
import { Moon, Sun } from 'lucide-vue-next'
import { Button } from '@/components/shadcn/ui/button'

const colorMode = useColorMode()

const toggleTheme = (): void => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button
    variant="ghost"
    size="icon-sm"
    class="relative"
    type="button"
    @click="toggleTheme"
  >
    <Sun
      class="size-4 scale-100 rotate-0 transition-all dark:absolute dark:scale-0 dark:-rotate-90"
    />
    <Moon
      class="absolute size-4 scale-0 rotate-90 transition-all dark:relative dark:scale-100 dark:rotate-0"
    />
    <span class="sr-only">Toggle theme</span>
  </Button>
</template>
