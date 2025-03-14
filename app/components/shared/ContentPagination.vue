<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{ type: 'articles' | 'projects' }>()

const state = reactive({
  query: '',
  loading: false,
  page: 0,
  limit: 5,
  totalPages: 0,
  totalRecords: 0,
  dropdownOpen: false,
  tagDropdownOpen: false,
})

const data = ref<Pick<ContentType, 'title' | 'publishedAt' | 'tags' | 'desc' | 'stem'>[] | null>(null)

const fetchContent = async () => {
  state.loading = true
  try {
    const response = await queryCollection(props.type)
      .limit(state.limit)
      .skip(state.page * state.limit)
      .select('title', 'tags', 'publishedAt', 'desc', 'stem')
      .order('publishedAt', 'DESC')
      .all()
    data.value = response
    state.totalRecords = response.length
    state.totalPages = Math.ceil(state.totalRecords / state.limit)
  }
  catch {
    throw createError({ statusCode: 500, message: 'Could not display content' })
  }
  finally {
    state.loading = false
  }
}

watch(() => [state.query, state.page], fetchContent)

onMounted(fetchContent)
</script>

<template>
  <div class="flex flex-col mx-auto max-w-2xl h-full p-6 space-y-6 text-gray-200 dark:text-gray-100">
    <SharedSearchInput
      v-model="state.query"
      class="w-full bg-gray-800 text-gray-200 border border-gray-700 rounded-lg"
    />

    <div class="flex flex-wrap items-center gap-4">
      <div
        v-if="state.loading"
        class="text-gray-400 text-lg font-medium"
      >
        Loading...
      </div>

      <ul
        v-if="data?.length && !state.loading"
        class="divide-y divide-gray-300"
      >
        <li
          v-for="d in data"
          :key="d.title"
          class="py-6"
        >
          <NuxtLink
            :to="d.stem"
            class="block space-y-2 p-4 rounded-lg transition"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-[#eeeeee] hover:text-teal-500 transition-colors duration-300">{{ d.title }}</h3>
            <span class="text-sm text-gray-400">Published on: <time>{{ new Date(d.publishedAt).toLocaleDateString() }}</time></span>
            <p class="text-md text-gray-800 dark:text-[#eeeeee]">{{ d.desc }}</p>
            <ul class="flex flex-wrap gap-2 mt-2">
              <li
                v-for="t in d.tags"
                :key="t"
                class="px-3 py-1 text-sm bg-gray-700 rounded-full"
              >
                {{ t }}
              </li>
            </ul>
          </NuxtLink>
        </li>
      </ul>

      <div
        v-else
        class="text-lg text-gray-400"
      >
        No results {{ state.query ? `for "${state.query}"` : '' }}
      </div>

      <div class="w-full flex items-center justify-between text-gray-900 dark:text-[#eeeeee] px-4 py-3 rounded-lg">
        <p class="text-sm">
          Showing {{ state.page * state.limit + 1 }} to {{ Math.min((state.page + 1) * state.limit, state.totalRecords) }} of {{ state.totalRecords }} results
        </p>
        <nav class="flex space-x-2">
          <button
            :disabled="state.page === 0"
            class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            @click="state.page--"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </button>
          <span class="px-4 py-2 text-dark-900 dark:text-[#eeeeee] font-semibold">Page {{ state.page + 1 }} of {{ state.totalPages }}</span>
          <button
            :disabled="state.page === state.totalPages - 1 || state.totalPages === 0"
            class="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50"
            @click="state.page++"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>
