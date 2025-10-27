<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/shadcn/components/ui/breadcrumb'
import { Separator } from '@/shadcn/components/ui/separator'
import {
  SidebarTrigger,
} from '@/shadcn/components/ui/sidebar'
import { NuxtLink } from '#components'

const items = useBreadcrumbItems()
</script>

<template>
  <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
    <div class="flex items-center gap-2 px-4">
      <SidebarTrigger class="-ml-1" />
      <Separator
        orientation="vertical"
        class="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>
          <template
            v-for="(item, index) in items"
            :key="item.label"
          >
            <BreadcrumbItem class="hidden md:block">
              <BreadcrumbLink
                :as="NuxtLink"
                :to="item.href"
              >
                {{ item.label }}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator v-if="index < items.length - 1" />
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  </header>
</template>
