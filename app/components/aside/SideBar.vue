<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { BookOpen, FileText, UserRound } from 'lucide-vue-next'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/shadcn/ui/sidebar'

type NavItem = {
  label: string
  to: string
  icon: LucideIcon
}

const primaryNav: NavItem[] = [
  { label: 'About', to: '/about', icon: UserRound },
  { label: 'Blog', to: '/posts', icon: BookOpen },
  { label: 'Resume', to: '/resume', icon: FileText },
]

const route = useRoute()
const { isMobile, setOpenMobile } = useSidebar()

const isActive = (path: string): boolean => {
  if (path === '/') {
    return route.path === '/'
  }

  return route.path === path || route.path.startsWith(`${path}/`)
}

const closeMobileSidebar = (): void => {
  if (isMobile.value) {
    setOpenMobile(false)
  }
}
</script>

<template>
  <Sidebar
    side="left"
    variant="floating"
    collapsible="offcanvas"
    class="[&_[data-mobile=true][data-slot=sidebar]]:border-border/50 [&_[data-mobile=true][data-slot=sidebar]]:bg-white/85 [&_[data-mobile=true][data-slot=sidebar]]:text-foreground [&_[data-mobile=true][data-slot=sidebar]]:shadow-xl [&_[data-mobile=true][data-slot=sidebar]]:backdrop-blur-xl dark:[&_[data-mobile=true][data-slot=sidebar]]:bg-black/85 [&_[data-slot=sidebar-inner]]:border-border/50 [&_[data-slot=sidebar-inner]]:bg-white/85 [&_[data-slot=sidebar-inner]]:backdrop-blur-xl dark:[&_[data-slot=sidebar-inner]]:bg-black/85"
  >
    <SidebarHeader class="border-b border-border/50 bg-white/85 backdrop-blur-xl dark:bg-black/85">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            as-child
          >
            <NuxtLink
              to="/"
              @click="closeMobileSidebar"
            >
              <div
                class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-semibold"
              >
                AH
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">Aidan Hibbard</span>
                <span class="text-xs text-muted-foreground">Portfolio</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent class="bg-white/85 backdrop-blur-xl dark:bg-black/85">
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupContent>
          <nav aria-label="Mobile">
            <SidebarMenu>
              <SidebarMenuItem
                v-for="item in primaryNav"
                :key="item.to"
              >
                <SidebarMenuButton
                  as-child
                  :is-active="isActive(item.to)"
                >
                  <NuxtLink
                    :to="item.to"
                    @click="closeMobileSidebar"
                  >
                    <component
                      :is="item.icon"
                      class="size-4"
                    />
                    <span>{{ item.label }}</span>
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </nav>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
