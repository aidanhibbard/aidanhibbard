<script setup lang="ts">
import {
  CalendarDate,
  today,
  getLocalTimeZone,
  DateFormatter,
} from "@internationalized/date";
import type {
  ArticlesCollectionItem,
  Collections,
  ProjectsCollectionItem,
  TalksCollectionItem,
} from "@nuxt/content";
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";

type PickList = "stem" | "title" | "description" | "publishedAt";
// All collections use the same schema
type ContentResponse = Pick<
  ArticlesCollectionItem | ProjectsCollectionItem | TalksCollectionItem,
  PickList
>[];

const toast = useToast();
const props = defineProps<{
  contentType: keyof Collections;
}>();
const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const schema = z.object({});
const pagination = reactive({
  page: 1,
  total: 0,
  itemsPerPage: 5,
});
const formState = reactive({
  tags: [],
  query: "",
});
const dateRange = shallowRef({
  start: new CalendarDate(1970, 1, 1),
  end: today(getLocalTimeZone()),
});
const availableTags = ref<string[]>([]);
const content = ref<ContentResponse>([]);

const fetchContent = async () => {
  const query = queryCollection(props.contentType)
    .limit(pagination.itemsPerPage)
    .skip((pagination.page - 1) * pagination.itemsPerPage)
    .where("publishedAt", ">", dateRange.value.start)
    .select("stem", "title", "description", "publishedAt");

  const data = await query.all();
  const count = await query.count();
  pagination.total = count;
  content.value = data;
};

const handleSubmit = async (
  event?: FormSubmitEvent<z.output<typeof schema>>
) => {
  if (event?.isTrusted) {
    try {
      await fetchContent();
      if (content.value.length === 0) {
        toast.add({
          title: "Could not find content with the given filters",
          type: "foreground",
        });
      }
    } catch {
      toast.add({
        title: "There was an error fetching content",
        type: "foreground",
      });
    }
  }
};

onMounted(fetchContent);
</script>

<template>
  <UContainer class="flex-1 flex flex-col max-w-3xl gap-y-4 py-4">
    <UForm
      :schema
      :state="formState"
      class="py-4 rounded-2xl mx-auto flex-col flex w-full"
      @submit="handleSubmit"
    >
      <div class="flex flex-col gap-y-4 relative justify-between">
        <!-- Query Input -->
        <UFormField label="Filter by title" name="query" class="flex-1 text-md">
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
        <div class="flex gap-x-4 items-center">
          <!-- Tags Selector -->
          <UFormField label="Tags" name="tags" class="text-md">
            <UInputMenu
              v-model="formState.tags"
              name="tags"
              multiple
              :items="availableTags"
              size="xl"
              placeholder="Select tags"
              color="neutral"
              variant="outline"
            />
          </UFormField>

          <!-- Date Range -->
          <div class="relative">
            <label
              class="block font-medium text-gray-700 dark:text-gray-300 mb-1 text-md"
              for="calendar"
              >Published</label
            >
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
                      {{
                        df.format(dateRange.start.toDate(getLocalTimeZone()))
                      }}
                      -
                      {{ df.format(dateRange.end.toDate(getLocalTimeZone())) }}
                    </template>
                    <template v-else>
                      {{
                        df.format(dateRange.start.toDate(getLocalTimeZone()))
                      }}
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

          <div class="absolute bottom-0 right-0">
            <UButton
              color="neutral"
              size="xl"
              class="w-full"
              type="submit"
              label="Filter"
              leading-icon="mdi:magnify"
            />
          </div>
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
              class="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-teal-300 transition-colors"
            >
              {{ item.title }}
            </h3>
            <p>
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
                  day: "numeric",
                })
              }}
            </time>
            <UIcon name="mdi:arrow-right" size="xl" />
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
