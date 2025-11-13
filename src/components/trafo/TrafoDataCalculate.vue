<script setup lang="ts">
import { type HTMLAttributes } from "vue";
import type {
  CalculateRow,
  ReadingRow,
  RestCapacity,
} from "../../types/calculation-type";

defineProps<{
  data: ReadingRow[];
  calculate: CalculateRow[];
  rest: RestCapacity;
  title?: string;
  suffixTitle?: string;
  class?: HTMLAttributes["class"];
  isColor?: boolean;
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

    <div class="px-6 pb-6">
      <table aria-label="reading table">
        <tbody>
          <tr
            v-for="(row, i) in data"
            :key="i"
            :class="{ 'bg-gray-100': i % 2 != 0 }"
          >
            <td
              v-if="row.vLabel"
              :colspan="row.colspan"
              :class="{ 'text-center': i == 0 }"
            >
              <span :class="{ 'text-black': i == 0 }">{{ row.vLabel }}</span>
            </td>
            <td v-if="row.vValue" class="text-right pr-8!">
              {{ row.vValue }}
            </td>
            <td v-if="row.iLabel">{{ row.iLabel }}</td>
            <td v-if="row.iValue" class="text-right pr-8!">
              {{ row.iValue }}
            </td>
          </tr>
        </tbody>
      </table>

      <table aria-label="calculate table">
        <thead>
          <tr class="text-sm">
            <th colspan="4">CALCULATE</th>
          </tr>
          <tr class="text-sm">
            <th></th>
            <th class="text-left">KVA</th>
            <th class="text-left">KW</th>
            <th class="text-left">KVAr</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in calculate"
            :key="i"
            :class="{ 'bg-gray-100': i % 2 != 0 }"
          >
            <td>{{ row.label }}</td>
            <td class="text-left">{{ row.kva }}</td>
            <td class="text-left">{{ row.kw }}</td>
            <td class="text-left">{{ row.kvar }}</td>
          </tr>
        </tbody>
      </table>

      <div class="border-b border-gray-200 text-sm font-medium">
        <div class="flex justify-between items-center h-10">
          <span>Sisa Kapasitas Trafo</span>
          <span
            v-if="rest.capacity && rest.percent"
            :class="{
              'text-green-600 font-bold': isColor,
              'bg-green-100 p-1 rounded': isColor,
            }"
          >
            {{ rest.capacity }} ({{ rest.percent }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  margin-top: 14px;

  thead > tr > th {
    padding: 0.25rem 0.75rem;
    font-weight: 600;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #e5e7eb;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  tbody > tr > td {
    padding: 0.25rem 0.75rem;
    font-weight: 600;
    border-top-width: 1px;
    border-bottom-width: 1px;
    border-color: #e5e7eb;
    color: #4a5565;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
}
</style>
