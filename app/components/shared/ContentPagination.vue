<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{ type: 'articles' | 'projects' }>()

const { query: { query: urlQuery, tags: urlTags } } = useRoute()

const state = reactive({
  loading: false,
  query: urlQuery as string ?? '',
  page: 0,
  limit: 5,
  totalPages: 0,
  totalRecords: 0,
  tags: (urlTags ?? []) as string[],
  dropdownOpen: false,
  tagDropdownOpen: false,
})

const data = ref<Pick<ContentType, 'title' | 'publishedAt' | 'tags' | 'desc' | 'stem'>[] | null>(null)
const availableTags = computed(() => [...new Set(data.value?.flatMap(d => d.tags) || [])])

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

watch(() => [state.query, state.page, state.limit, state.tags], fetchContent)

onMounted(fetchContent)
</script>

<template>
  <div class="flex flex-col mx-auto max-w-2xl h-full p-6 space-y-6">
    <SharedSearchInput
      v-model="state.query"
      class="w-full"
    />

    <div class="flex items-center gap-4">
      <!-- Limit Selection Dropdown -->
      <div class="relative">
        <button
          class="px-4 py-2 bg-gray-100 rounded-md hover:bg-teal-500 hover:text-white flex items-center justify-between w-28"
          @click="state.dropdownOpen = !state.dropdownOpen"
        >
          {{ state.limit }} per page
          <ChevronDownIcon class="w-5 h-5 ml-2" />
        </button>
        <ul
          v-if="state.dropdownOpen"
          class="absolute mt-2 w-full bg-white border rounded-md shadow-md"
        >
          <li
            v-for="limit in [5, 10, 15]"
            :key="limit"
            class="px-4 py-2 cursor-pointer hover:bg-teal-500 hover:text-white"
            @click="state.limit = limit; state.dropdownOpen = false"
          >
            {{ limit }} per page
          </li>
        </ul>
      </div>

      <!-- Tag Selection Dropdown -->
      <div class="relative">
        <button
          class="px-4 py-2 bg-gray-100 rounded-md hover:bg-teal-500 hover:text-white flex items-center justify-between w-40"
          @click="state.tagDropdownOpen = !state.tagDropdownOpen"
        >
          Select Tags
          <ChevronDownIcon class="w-5 h-5 ml-2" />
        </button>
        <ul
          v-if="state.tagDropdownOpen"
          class="absolute mt-2 w-full bg-white border rounded-md shadow-md"
        >
          <li
            v-for="tag in availableTags"
            :key="tag"
            class="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-teal-500 hover:text-white"
            @click="state.tags.includes(tag) ? state.tags = state.tags.filter(t => t !== tag) : state.tags.push(tag)"
          >
            <span>{{ tag }}</span>
            <span v-if="state.tags.includes(tag)">✔️</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Selected Tags -->
    <div class="flex flex-wrap gap-2 mt-2">
      <div
        v-for="tag in state.tags"
        :key="tag"
        class="flex items-center bg-teal-500 text-white px-3 py-1 rounded-full"
      >
        {{ tag }}
        <button
          class="ml-2"
          @click="state.tags = state.tags.filter(t => t !== tag)"
        >
          ❌
        </button>
      </div>
    </div>

    <div
      v-if="state.loading"
      class="text-gray-600 text-lg font-medium"
    >
      Loading...
    </div>

    <ul
      v-if="data?.length && !state.loading"
      class="divide-y divide-gray-200"
    >
      <li
        v-for="d in data"
        :key="d.title"
        class="py-6"
      >
        <NuxtLink
          :to="d.stem"
          class="block space-y-2"
        >
          <h3 class="text-xl font-semibold text-gray-900">{{ d.title }}</h3>
          <span class="text-sm text-gray-500">Published on: <time>{{ new Date(d.publishedAt).toLocaleDateString() }}</time></span>
          <p class="text-md text-gray-600">{{ d.desc }}</p>
          <ul class="flex flex-wrap gap-2 mt-2">
            <li
              v-for="t in d.tags"
              :key="t"
              class="px-3 py-1 text-sm bg-gray-200 rounded-full transition-colors duration-300 hover:bg-teal-500 hover:text-white"
            >
              {{ t }}
            </li>
          </ul>
        </NuxtLink>
      </li>
    </ul>

    <div
      v-else
      class="text-lg text-gray-500"
    >
      No results {{ state.query ? `for \"${state.query}\"` : '' }}
    </div>

    <div class="flex items-center justify-between border-t border-gray-300 bg-white px-4 py-3">
      <p class="text-sm text-gray-700">
        Showing {{ state.page * state.limit + 1 }} to {{ Math.min((state.page + 1) * state.limit, state.totalRecords) }} of {{ state.totalRecords }} results
      </p>
      <nav class="flex space-x-2">
        <button
          :disabled="state.page === 0"
          class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          @click="state.page--"
        >
          <ChevronLeftIcon class="w-5 h-5" />
        </button>
        <span class="px-4 py-2 text-gray-900 font-semibold">Page {{ state.page + 1 }} of {{ state.totalPages }}</span>
        <button
          :disabled="state.page === state.totalPages - 1 || state.totalPages === 0"
          class="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          @click="state.page++"
        >
          <ChevronRightIcon class="w-5 h-5" />
        </button>
      </nav>
    </div>
  </div>
</template>
