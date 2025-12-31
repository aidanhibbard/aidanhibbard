<script setup lang="ts">
import { computed, useRuntimeConfig } from '#imports'
import { toast } from 'vue-sonner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'

const props = defineProps<{ id?: string }>()

const { headings } = useRuntimeConfig().public.mdc
const generate = computed(() => props.id && ((typeof headings?.anchorLinks === 'boolean' && headings?.anchorLinks === true) || (typeof headings?.anchorLinks === 'object' && headings?.anchorLinks?.h5)))

const copyLink = async () => {
  if (!props.id || !generate.value)
    return
  try {
    const base = window.location.href.split('#')[0] ?? ''
    const url = `${base}#${props.id}`
    await navigator.clipboard.writeText(url)
    toast.success('Copied to clipboard')
  }
  catch {
    toast.error('Copy failed')
  }
}
</script>

<template>
  <TooltipProvider v-if="props.id && generate">
    <Tooltip>
      <TooltipTrigger as-child>
        <h5
          :id="props.id"
          class="text-lg font-semibold mt-6 mb-3 tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          role="button"
          tabindex="0"
          @click="copyLink"
          @keydown.enter.prevent="copyLink"
          @keydown.space.prevent="copyLink"
        >
          <slot />
        </h5>
      </TooltipTrigger>
      <TooltipContent>
        Click to copy link
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <h5
    v-else
    :id="props.id"
    class="text-lg font-semibold mt-6 mb-3 tracking-tight"
  >
    <slot />
  </h5>
</template>
