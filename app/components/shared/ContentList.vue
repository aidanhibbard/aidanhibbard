<script setup lang="ts">
import {
  CalendarDate,
  today,
  getLocalTimeZone,
  DateFormatter
} from '@internationalized/date';
import type {
  ArticlesCollectionItem,
  Collections,
  ProjectsCollectionItem,
  TalksCollectionItem
} from '@nuxt/content';

type PickList = 'stem' | 'title' | 'description' | 'publishedAt';
// All collections use the same schema
type ContentResponse = Pick<
  ArticlesCollectionItem | ProjectsCollectionItem | TalksCollectionItem,
  PickList
>[];

const toast = useToast();
const props = defineProps<{
  contentType: keyof Collections;
}>();
const df = new DateFormatter('en-US', {
  dateStyle: 'medium'
});

const pagination = reactive({
  page: 1,
  total: 0,
  itemsPerPage: 5
});
const formState = reactive({
  query: ''
});
const dateRange = shallowRef({
  start: new CalendarDate(1970, 1, 1),
  end: today(getLocalTimeZone())
});
const content = ref<ContentResponse>([]);

const fetchContent = async () => {
  const query = queryCollection(props.contentType)
    .where('title', 'LIKE', `%${formState.query}%`)
    .andWhere(query =>
      query
        .where('publishedAt', '>', dateRange.value.start.toString())
        .where('publishedAt', '<', dateRange.value.end.toString())
    )
    .order('publishedAt', 'DESC')
    .select('stem', 'title', 'description', 'publishedAt');

  const data = await query
    .limit(pagination.itemsPerPage)
    .skip((pagination.page - 1) * pagination.itemsPerPage)
    .all();
  const count = await query.count();
  pagination.total = count;
  content.value = data;
};

watch(() => [formState.query, dateRange.value.start, dateRange.value.end, pagination.itemsPerPage, pagination.page], async () => {
  try {
    await fetchContent();
    if (content.value.length === 0) {
      toast.add({
        title: 'Could not find content with the given filters',
        type: 'foreground'
      });
    }
  }
  catch {
    toast.add({
      title: 'There was an error fetching content',
      type: 'foreground'
    });
  }
});

onMounted(fetchContent);
</script>

<template>
  <UContainer class="flex-1 flex flex-col max-w-3xl gap-y-4 py-4">
    <UForm
      :state="formState"
      class="space-y-4"
    >
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:flex-wrap">
        <!-- Query Input -->
        <UFormField
          label="Filter by title"
          name="query"
          class="flex-1 text-md min-w-[200px]"
        >
          <UInput
            v-model="formState.query"
            name="query"
            type="text"
            size="xl"
            class="w-full"
            leading-icon="mdi:magnify"
            placeholder="Enter query..."
            color="neutral"
            variant="outline"
          />
        </UFormField>

        <!-- Date Range -->
        <div class="flex-1 min-w-[200px]">
          <label
            class="block font-medium text-gray-700 dark:text-gray-300 mb-1 text-md"
            for="calendar"
          >
            Published
          </label>
          <UPopover class="w-full">
            <UButton
              color="neutral"
              variant="outline"
              size="xl"
              class="w-full justify-between"
              icon="mdi:calendar"
            >
              <span class="truncate">
                <template v-if="dateRange.start">
                  <template v-if="dateRange.end">
                    {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
                    -
                    {{ df.format(dateRange.end.toDate(getLocalTimeZone())) }}
                  </template>
                  <template v-else>
                    {{ df.format(dateRange.start.toDate(getLocalTimeZone())) }}
                  </template>
                </template>
                <template v-else> Any date </template>
              </span>
            </UButton>
            <template #content>
              <UCalendar
                v-model="dateRange"
                name="calendar"
                class="mt-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl"
                :number-of-months="2"
                range
                color="neutral"
              />
            </template>
          </UPopover>
        </div>
      </div>
    </UForm>

    <!-- Articles Grid -->
    <div class="flex flex-col gap-y-4 flex-1">
      <NuxtLink
        v-for="item in content"
        :key="item.stem"
        :to="`/${item.stem}`"
        class="block bg-none border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div class="p-4 flex flex-col h-full">
          <section class="flex-1">
            <h3
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-teal-500 transition-colors"
            >
              {{ item.title }}
            </h3>
            <p class="truncate">
              {{ item.description }}
            </p>
          </section>
          <footer
            class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-4"
          >
            <time :datetime="String(item.publishedAt)">
              Published {{
                new Date(item.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })
              }}
            </time>
            <UIcon
              name="mdi:arrow-right"
              size="xl"
            />
          </footer>
        </div>
      </NuxtLink>
    </div>

    <!-- Pagination -->
    <div class="mt-8 flex justify-center">
      <UPagination
        v-model:page="pagination.page"
        color="neutral"
        active-color="neutral"
        :total="pagination.total"
        :items-per-page="pagination.itemsPerPage"
        size="xl"
      />
    </div>
  </UContainer>
</template>
