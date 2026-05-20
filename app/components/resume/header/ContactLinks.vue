<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { Button } from '@/components/shadcn/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'
import type { ResumeContact } from '#shared/types/content/resume-contact'

const props = defineProps<{
  contact: ResumeContact
}>()

const iconButtonClass = 'size-8 rounded-none text-muted-foreground hover:text-foreground'

type ContactLink = {
  href: string
  label: string
  icon: typeof Mail
  external?: boolean
}

const contactLinks = computed<ContactLink[]>(() => [
  {
    href: `mailto:${props.contact.email}`,
    label: 'Email',
    icon: Mail,
  },
  {
    href: props.contact.linkedin,
    label: 'LinkedIn',
    icon: Linkedin,
    external: true,
  },
  {
    href: props.contact.github,
    label: 'GitHub',
    icon: Github,
    external: true,
  },
])
</script>

<template>
  <TooltipProvider>
    <div class="mt-6 flex items-center gap-1">
      <Tooltip
        v-for="link in contactLinks"
        :key="link.label"
      >
        <TooltipTrigger as-child>
          <Button
            variant="ghost"
            size="icon-sm"
            as-child
            :class="iconButtonClass"
          >
            <a
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
            >
              <component
                :is="link.icon"
                class="size-4"
                aria-hidden="true"
              />
              <span class="sr-only">{{ link.label }}</span>
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{{ link.label }}</TooltipContent>
      </Tooltip>
    </div>
  </TooltipProvider>
</template>
