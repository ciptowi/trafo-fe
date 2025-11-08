<script setup lang="ts">
import { Paginator, type PageState } from "primevue";

export type PageControl = {
  page: number;
  first: number;
  totalRecords: number;
};

const props = defineProps<{ perPage?: number }>();
const emit = defineEmits<{ (e: "change", event: PageState): void }>();
const model = defineModel<PageControl>({ required: true });

function previewPage(state: PageState) {
  const total = model.value.totalRecords;
  if (!total) return "";
  const first = state.first + 1;
  const endOfRow = state.first + state.rows;
  const last = endOfRow > total ? total : endOfRow;

  return `Display ${first} to ${last} of ${total} rows`;
}

function eventChange(event: PageState) {
  model.value.page = event.page;
  emit("change", event);
}
</script>

<template>
  <div class="my-2 mx-4 bg-white rounded-lg shadow-sm">
    <Paginator
      v-model:first="model.first"
      class="px-1"
      :rows="props.perPage || 10"
      :totalRecords="model.totalRecords"
      @page="eventChange"
    >
      <template #start="{ state }"> {{ previewPage(state) }} </template>
    </Paginator>
  </div>
</template>
