<script setup lang="ts">
import type { HTMLAttributes } from "vue";

defineProps<{
  title?: string;
  suffixTitle?: string;
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="class"
    class="bg-white py-2 px-4 border-gray-200 rounded-lg shadow-sm"
  >
    <h3
      v-if="title"
      class="my-3 pb-2 flex justify-between border-b border-b-gray-400"
    >
      <div class="text-sm font-semibold text-gray-700">{{ title }}</div>
      <div class="text-xs text-gray-500">{{ suffixTitle }}</div>
    </h3>
    <slot></slot>
  </div>
</template>
