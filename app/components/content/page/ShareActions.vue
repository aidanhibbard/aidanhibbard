<script setup lang="ts">
import { ArrowUpRight, Github, Linkedin } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
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

const route = useRoute()
const requestURL = useRequestURL()

const iconButtonClass = 'size-8 rounded-none text-muted-foreground hover:text-foreground'

const githubSourceUrl = computed(() => {
  const relativePath = props.path.replace(/^\//, '')
  return `https://github.com/aidanhibbard/aidanhibbard/blob/main/content/${relativePath}.md`
})

const linkedInShareUrl = computed(() => {
  const basePath = route.fullPath.split('#')[0] ?? route.fullPath
  const pageUrl = new URL(basePath, requestURL.origin).toString()

  return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
})

const copyLink = async (): Promise<void> => {
  try {
    const basePath = route.fullPath.split('#')[0] ?? route.fullPath
    const pageUrl = new URL(basePath, requestURL.origin).toString()

    await navigator.clipboard.writeText(pageUrl)
    toast.success('Link copied')
  }
  catch {
    toast.error('Copy failed')
  }
}
</script>

<template>
  <TooltipProvider>
    <div class="flex items-center rounded-none border border-border/60">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            :class="iconButtonClass"
            @click="copyLink"
          >
            <ArrowUpRight class="size-4" />
            <span class="sr-only">Copy link</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Copy link</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon-sm"
            as-child
            :class="iconButtonClass"
          >
            <a
              :href="linkedInShareUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin class="size-4" />
              <span class="sr-only">Share on LinkedIn</span>
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Share on LinkedIn</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon-sm"
            as-child
            :class="iconButtonClass"
          >
            <a
              :href="githubSourceUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github class="size-4" />
              <span class="sr-only">Open in GitHub</span>
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Open in GitHub</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
