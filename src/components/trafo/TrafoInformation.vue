<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import type { InformationRow } from "../../types/calculation-type";

defineProps<{
  data: InformationRow[];
  title?: string;
  suffixTitle?: string;
  class?: HTMLAttributes["class"];
  bodyClass?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="class"
    class="bg-white border-gray-200 rounded-lg shadow-sm w-full"
  >
    <div v-if="title" class="py-4 bg-gray-500 rounded-t-lg px-6">
      <div class="flex justify-between items-center text-white">
        <div class="text-sm font-semibold">{{ title }}</div>
        <div class="text-xs">{{ suffixTitle }}</div>
      </div>
    </div>

    <div class="px-4" :class="bodyClass">
      <table aria-label="information table">
        <tbody>
          <tr v-for="(row, i) in data" :key="i">
            <td class="text-gray-400">{{ row.label }}</td>
            <td class="text-right">
              <slot name="value" :row="row">{{ row.value }}</slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;

  tbody > tr > td {
    padding: 0.25rem;
    font-weight: 600;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #e5e7eb;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
