<script setup lang="ts">
import { toast } from 'vue-sonner'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'

const codeEl = ref<HTMLElement | null>(null)

const copyInline = async (event: MouseEvent | KeyboardEvent): Promise<void> => {
  event.preventDefault()
  event.stopPropagation()

  const text = codeEl.value?.innerText?.trim() ?? ''
  if (!text) {
    return
  }

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
      <TooltipTrigger as-child>
        <span class="inline-block max-w-full align-baseline">
          <code
            ref="codeEl"
            role="button"
            tabindex="0"
            class="inline-block cursor-pointer rounded bg-muted/60 px-1 py-0.5 font-mono text-[0.925em] text-foreground align-baseline transition-colors hover:bg-muted"
            @click.stop="copyInline"
            @keydown.enter.prevent="copyInline"
            @keydown.space.prevent="copyInline"
          >
            <slot />
          </code>
        </span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        :side-offset="6"
      >
        Click to copy
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
