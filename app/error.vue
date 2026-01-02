<script setup lang="ts">
import type { NuxtError } from '#app'

import { ArrowUpRightIcon, Sprout } from 'lucide-vue-next'
import { Button } from '~/components/shadcn/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '~/components/shadcn/ui/empty'

defineProps<{ error: NuxtError }>()

const handleError = async () => await clearError()
</script>

<template>
  <LayoutPageContainer>
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Sprout />
        </EmptyMedia>
        <EmptyTitle>{{ error.statusCode }}</EmptyTitle>
        <EmptyDescription>
          {{ error.message }}
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div class="flex">
          <Button @click="handleError">
            Go Back
          </Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        as-child
        class="text-muted-foreground"
        size="sm"
      >
        <NuxtLink
          external
          to="https://github.com/aidanhibbard/aidanhibbard/issues"
        >
          Open an issue <ArrowUpRightIcon />
        </NuxtLink>
      </Button>
    </Empty>
  </LayoutPageContainer>
</template>
