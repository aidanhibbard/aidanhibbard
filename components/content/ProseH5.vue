<script setup lang="ts">
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

const route = useRoute()
const requestURL = useRequestURL()

const copyLink = async () => {
  if (!props.id || !generate.value)
    return
  try {
    const basePath = route.fullPath.split('#')[0] ?? route.fullPath
    const url = new URL(basePath, requestURL.origin)
    url.hash = props.id
    await navigator.clipboard.writeText(url.toString())
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
          class="text-lg inline font-semibold my-4 tracking-tight"
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
    class="text-lg inline font-semibold my-4 tracking-tight"
  >
    <slot />
  </h5>
</template>
