<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/shadcn/ui/sidebar'

type NavItem = {
  label: string
  to: string
}

const primaryNav: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/posts' },
  { label: 'Resume', to: '/resume' },
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
    collapsible="offcanvas"
  >
    <SidebarHeader class="border-b border-sidebar-border">
      <NuxtLink
        to="/"
        class="flex h-12 items-center px-2 text-base font-semibold tracking-tight"
        @click="closeMobileSidebar"
      >
        Aidan Hibbard
      </NuxtLink>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
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
                    {{ item.label }}
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
