import type { LucideIcon } from 'lucide-vue-next'

export type NavigationLink = {
  label: string
  to: string
  icon: LucideIcon
}

export type NavigationSocialLink = {
  label: string
  href: string
  icon: LucideIcon
}
