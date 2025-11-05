<script setup lang="ts">
import { Moon, Sun, Menu, Github, Home, User, Newspaper, FileText } from 'lucide-vue-next'
import { Sheet, SheetTrigger, SheetContent, SheetClose } from '~/components/shadcn/ui/sheet'
import { Button } from '~/components/shadcn/ui/button'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem } from '~/components/shadcn/ui/sidebar'

const { theme, toggleTheme } = useTheme()

const links = [
  { name: 'About', href: '/about' },
  { name: 'Articles', href: '/articles' },
  { name: 'Resume', href: '/resume' },
]
</script>

<template>
  <header
    class="flex h-16 shrink-0 z-50 fixed top-0 right-0 left-0 items-center transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/60 backdrop-blur-md"
  >
    <div
      class="flex w-full justify-between px-4 md:px-12"
    >
      <div class="flex items-center gap-2 md:w-1/3">
        <!-- Mobile nav drawer trigger -->
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
          >
            <Menu class="h-4 w-4" />
          </SheetTrigger>
          <SheetContent side="left">
            <div class="mt-4">
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SheetClose as-child>
                      <NuxtLink
                        to="/"
                        class="flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 ring-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0"
                      >
                        <Home />
                        <span>Home</span>
                      </NuxtLink>
                    </SheetClose>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SheetClose as-child>
                      <NuxtLink
                        to="/about"
                        class="flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 ring-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0"
                      >
                        <User />
                        <span>About</span>
                      </NuxtLink>
                    </SheetClose>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SheetClose as-child>
                      <NuxtLink
                        to="/articles"
                        class="flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 ring-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0"
                      >
                        <Newspaper />
                        <span>Articles</span>
                      </NuxtLink>
                    </SheetClose>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SheetClose as-child>
                      <NuxtLink
                        to="/resume"
                        class="flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-sm outline-hidden transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 ring-sidebar-ring [&>svg]:size-4 [&>svg]:shrink-0"
                      >
                        <FileText />
                        <span>Resume</span>
                      </NuxtLink>
                    </SheetClose>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </div>
          </SheetContent>
        </Sheet>
        <NuxtLink
          to="/"
          class="inline-flex items-center font-brand text-3xl md:text-4xl font-normal tracking-tight"
          aria-label="Home"
        >
          <span class="hidden md:inline">Aidan Hibbard</span>
        </NuxtLink>
      </div>

      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          class="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full"
          :to="link.href"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <div
        class="flex items-center justify-end gap-2 ml-auto md:ml-0 md:w-1/3"
      >
        <NuxtLink
          :as="Button"
          to="https://github.com/aidanHibbard"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          title="GitHub profile"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Github
            class="w-4 h-4"
          />
        </NuxtLink>
        <Button
          type="button"
          aria-label="Toggle theme"
          class="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
          @click="toggleTheme"
        >
          <Sun
            v-if="theme === 'light'"
            class="h-4 w-4"
          />
          <Moon
            v-else
            class="h-4 w-4"
          />
        </Button>
      </div>
    </div>
  </header>
</template>
