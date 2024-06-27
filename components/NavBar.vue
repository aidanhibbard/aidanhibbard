<script setup lang='ts'>
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, Switch } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const navigation = [
  { name: 'Articles', href: '#', current: true },
  { name: 'Projects', href: '#', current: false },
  { name: 'About', href: '#', current: false },
  { name: 'Resume', href: '#', current: false },
];

const dark = ref(false);
</script>

<template>
  <Disclosure as="nav" class="sticky top-0" v-slot="{ open }">
    <header class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <span class="text-xl">
              Aidan Hibbard
            </span>
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-900 hover:bg-gray-900 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3 flex space-x-4 justify-between">
            <div class="relative mt-2 rounded-md shadow-sm sm:hidden md:hidden lg:block">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span class="text-gray-500 sm:text-sm"><MagnifyingGlassIcon class="h-4 w-4" aria-hidden="true" /></span>
              </div>
              <input type="text" name="Search" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Find anything..." />
              <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-3">
                <label for="Search" class="text-gray-500 sm:text-sm">Search</label>
              </div>
            </div>
            <button type="button" class="relative p-1 text-gray-900 sm:block md:block lg:hidden">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">Search</span>
              <MagnifyingGlassIcon class="h-6 w-6" aria-hidden="true" />
            </button>
            <div class="relative mt-3.5 rounded-md shadow-sm">
              <Switch
              v-model="dark"
              :class="dark ? 'bg-white' : 'bg-gray-900'"
              class="relative inline-flex h-6 w-11 items-center rounded-full outline"
            >
              <span class="sr-only">dark mode</span>
              <span
                :class="dark ? 'translate-x-6 bg-gray-900' : 'translate-x-1 bg-white'"
                class="inline-block h-4 w-4 transform rounded-full transition"
              />
            </Switch>
            </div>
          </Menu>
        </div>
      </div>
    </header>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href" :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']" :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<style scoped>

</style>