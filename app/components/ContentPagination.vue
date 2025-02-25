<script setup lang="ts">
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/vue/24/outline'
import type { ArticlesCollectionItem, ProjectsCollectionItem } from '@nuxt/content'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  type: 'articles' | 'projects'
}>()

const {
  query: { query: urlQuery },
} = useRoute()

const state: {
  loading: boolean
  query: string
  page: number
  totalPages: number
  totalRecords: number
  limit: number
  tags: string[]
} = reactive({
  loading: false,
  query: urlQuery as string ?? '',
  page: 0,
  limit: 5,
  totalPages: 0,
  totalRecords: 0,
  tags: [],
})

const data = ref<
  Pick<ArticlesCollectionItem | ProjectsCollectionItem, 'title' | 'path' | 'description' | 'publishedAt' | 'tags'>[]
  |
  null
>([
  {
    title: 'Test test test',
    path: 'This is the test',
    description: 'A post description',
    publishedAt: '10-20-2024',
    tags: ['test'],
  },
  {
    title: 'Test test testing',
    path: 'This is the test',
    description: 'A post description',
    publishedAt: '10-20-2024',
    tags: ['test'],
  },
])

const fetchContent = async () => {
  state.loading = true
  const response = await queryCollection(props.type)
    .where('title', 'LIKE', state.query)
    .limit(state.limit)
    .skip(state.page * state.limit)
    .select('path', 'title', 'description', 'tags', 'publishedAt')
    .order('publishedAt', 'DESC')
    .all()
  data.value = response
  state.loading = false
}

const clearQuery = () => {
  state.query = ''
}

watch(() => state.query, async () => {
  await fetchContent()
})

watch(() => state.page, async () => {
  await fetchContent()
})

watch(() => state.limit, async () => {
  await fetchContent()
})

onMounted(async () => {
  await fetchContent()
})
</script>

<template>
  <div class="flex flex-col mx-auto max-w-xl h-full p-4">
    <div class="flex flex-1 justify-end relative w-full">
      <input
        v-model="state.query"
        type="text"
        class="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:ring-2 focus:ring-[#76ABAE] focus:outline-none"
        :placeholder="`Search ${props.type}...`"
      >
      <MagnifyingGlassIcon class="absolute right-3 top-2.5 size-5 text-gray-400" />
      <XCircleIcon
        v-if="state.query"
        class="absolute right-9 top-2.5 size-5 cursor-pointer text-gray-400 hover:text-red-500"
        @click="clearQuery"
      />
    </div>
    <div v-if="state.loading">
      Loading...
    </div>
    <ul
      v-if="data?.length && !state.loading"
      class="divide-y divide-gray-100"
    >
      <li
        v-for="d in data"
        :key="d.title"
        class="flex justify-between gap-x-6 py-5"
      >
        <div class="flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-sm/6 font-semibold text-gray-900">
              {{ d.title }}
            </p>
            <p class="mt-1 truncate text-xs/5 text-gray-500">
              {{ d.description }}
            </p>
          </div>
        </div>
      </li>
    </ul>
    <div
      v-else
      class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
    >
      No results {{ state.query ? `for state.query` : '' }}
    </div>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Previous</a>
        <a
          href="#"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            {{ ' ' }}
            <!-- Start of record count -->
            <span class="font-medium">1</span>
            {{ ' ' }}
            to
            {{ ' ' }}
            <!-- end of record count -->
            <span class="font-medium">10</span>
            {{ ' ' }}
            of
            {{ ' ' }}
            <span class="font-medium">{{ state.totalRecords }}</span>
            {{ ' ' }}
            results
          </p>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-xs"
            aria-label="Pagination"
          >
            <button
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :disabled="state.page === 0"
              @click="state.page--"
            >
              <span class="sr-only">Previous</span>
              <ChevronLeftIcon
                class="size-5"
                aria-hidden="true"
              />
            </button>
            <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
            <button
              href="#"
              aria-current="page"
              class="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </button>
            <button
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              :disabled="state.page === state.totalPages"
              @click="state.page++"
            >
              <span class="sr-only">Next</span>
              <ChevronRightIcon
                class="size-5"
                aria-hidden="true"
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
