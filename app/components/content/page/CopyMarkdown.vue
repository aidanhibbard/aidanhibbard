<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next'
import { Button } from '@/components/shadcn/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'

const props = defineProps<{
  path: string
}>()

const copying = ref(false)
const copied = ref(false)

const handleCopyMarkdown = async (): Promise<void> => {
  copying.value = true

  try {
    const response = await $fetch(`/api/content/markdown${props.path === '/resume' ? '' : props.path}`)

    if (typeof response === 'string' && response) {
      await navigator.clipboard.writeText(response)
      copied.value = true

      window.setTimeout(() => {
        copied.value = false
      }, 1500)
    }
  }
  finally {
    copying.value = false
  }
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="h-8 rounded-none border border-border/60 px-3 font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase hover:text-foreground"
          :disabled="copying"
          @click="handleCopyMarkdown"
        >
          <Check
            v-if="copied"
            class="size-3.5"
          />
          <Copy
            v-else
            class="size-3.5"
          />
          Copy markdown
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copy raw markdown</TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
