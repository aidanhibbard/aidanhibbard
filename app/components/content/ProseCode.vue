<script setup lang="ts">
import { toast } from 'vue-sonner'
import { Button } from '@/components/shadcn/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'

const codeEl = ref<HTMLElement | null>(null)

const copyInline = async () => {
  const text = codeEl.value?.innerText?.trim() ?? ''
  if (!text)
    return
  try {
    await navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }
  catch {
    toast.error('Copy failed')
  }
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <Button
          ref="codeEl"
          variant="ghost"
          @click="copyInline"
        >
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        Click to Copy
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
