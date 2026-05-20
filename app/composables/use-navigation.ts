import { BookOpen, FileText, Github, Linkedin, UserRound } from 'lucide-vue-next'
import type { NavigationLink, NavigationSocialLink } from '@/types/navigation/navigation-link'

const primaryNav: NavigationLink[] = [
  { label: 'About', to: '/about', icon: UserRound },
  { label: 'Blog', to: '/posts', icon: BookOpen },
  { label: 'Resume', to: '/resume', icon: FileText },
]

const socialLinks: NavigationSocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/aidanhibbard',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/aidan-hibbard/',
    icon: Linkedin,
  },
]

export default () => {
  const route = useRoute()

  const isActive = (path: string): boolean => {
    if (path === '/') {
      return route.path === '/'
    }

    return route.path === path || route.path.startsWith(`${path}/`)
  }

  return {
    primaryNav,
    socialLinks,
    isActive,
  }
}
