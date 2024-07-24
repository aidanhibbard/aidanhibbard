<script setup lang='ts'>
import { watch } from 'vue';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, Switch } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import type { ParsedContent } from '@nuxt/content';
const { navigation } = useNav();

const state = reactive({
  query: '',
  foundItems: [] as Pick<ParsedContent, "title" | "_path">[],
  dark: false,
});

watch(() => state.query, async () => {
  if (state.query) {
    const found = await queryContent('articles')
      .where({ title: { $contains: state.query } })
      .only(['title', '_path'])
      .limit(5)
      .find();
    state.foundItems = found;
  }
});
</script>

<template>
  <Disclosure
    v-slot="{ open }"
    as="nav"
    class="sticky top-0 z-[100] border-b dark:bg-gray-800 bg-white"
  >
    <header class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton 
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon
              v-if="!open"
              class="block h-6 w-6"
              aria-hidden="true"
            />
            <XMarkIcon
              v-else
              class="block h-6 w-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <NuxtLink
              class="text-xl"
              to="/"
            >
              Aidan Hibbard
            </NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="['rounded-md px-3 py-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <Menu
            as="div"
            class="relative ml-3 flex space-x-4 justify-between"
          >
            <div class="relative shadow-sm hidden lg:block relative">
              <input 
                id="search"
                v-model="state.query"
                type="text"
                name="Search"
                class="w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search articles and projects"
              >
              <ul
                v-if="state.foundItems.length > 0 && state.query"
                class="mt-4 shadow-lg rounded-md absolute bottom-[-1] w-full"
              >
                <li
                  v-for="item in state.foundItems"
                  :key="item.title"
                >
                  <NuxtLink
                    :to="item._path"
                    class="block h-full px-4 py-2 border-b border-gray-200 hover:bg-gray-100 bg-none"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="relative p-1 text-gray-900 block lg:hidden"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Search</span>
              <MagnifyingGlassIcon
                class="h-6 w-6"
                aria-hidden="true"
              />
            </button>
            <Switch
              v-model="state.dark"
              :class="state.dark ? 'bg-white' : 'bg-gray-900'"
              class="relative inline-flex h-6 w-11 items-center rounded-full mt-1 lg:mt-1.5 outline outline-1"
              @click="$colorMode.preference = state.dark ? 'dark' : 'light'"
            >
              <span class="sr-only">dark mode</span>
              <span
                :class="state.dark ? 'translate-x-6 bg-gray-900' : 'translate-x-1 bg-white'"
                class="inline-block h-4 w-4 transform rounded-full transition"
              />
            </Switch>
          </Menu>
        </div>
      </div>
    </header>

    <DisclosurePanel class="sm:hidden z-[500]">
      <div class="space-y-1 px-2 pb-3 pt-2 z-[500] border-t">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium z-[500]']"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>