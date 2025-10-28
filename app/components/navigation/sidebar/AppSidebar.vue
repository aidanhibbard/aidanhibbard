<script setup lang="ts">
import type { SidebarProps } from '@/shadcn/components/ui/sidebar'
import NavMain from '@/components/navigation/sidebar/NavMain.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/shadcn/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: 'icon',
})

const links = [
  { title: 'About', url: '/about' },
  { title: 'Blog', url: '/blog' },
  { title: 'Resume', url: '/resume' },
]
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="flex h-12 items-center justify-center font-semibold">
        <span>Aidan Hibbard</span>
      </div>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="links" />
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
