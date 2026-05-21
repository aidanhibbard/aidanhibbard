<script setup lang="ts">
import type { NuxtError } from '#app'

import { ArrowUpRightIcon, Sprout } from 'lucide-vue-next'
import { Button } from '~/components/shadcn/ui/button'

defineProps<{ error: NuxtError }>()

const handleError = async () => await clearError({
  redirect: '/',
})
</script>

<template>
  <NuxtLayout>
    <div class="mx-auto flex min-h-[calc(100svh-3.5rem)] w-full max-w-lg flex-col items-center justify-center gap-8 px-4 text-center md:min-h-[calc(100svh-4rem)]">
      <div class="flex size-14 items-center justify-center rounded-xl bg-muted text-foreground">
        <Sprout class="size-7" />
      </div>

      <div class="space-y-3">
        <p class="cn-font-heading text-6xl font-semibold tracking-tight md:text-7xl">
          {{ error.status }}
        </p>
        <p class="text-xl text-muted-foreground md:text-2xl">
          {{ error.message }}
        </p>
      </div>

      <div class="flex flex-col items-center gap-4">
        <Button
          size="lg"
          @click="handleError"
        >
          Go Back
        </Button>
        <Button
          variant="link"
          as-child
          class="text-base text-muted-foreground"
        >
          <NuxtLink
            external
            to="https://github.com/aidanhibbard/aidanhibbard/issues"
          >
            Open an issue <ArrowUpRightIcon class="size-4" />
          </NuxtLink>
        </Button>
      </div>
    </div>
  </NuxtLayout>
</template>
