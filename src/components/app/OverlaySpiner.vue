<script setup lang="ts">
import { isOverlay } from "./overlay-state";
</script>

<template>
  <div
    v-if="isOverlay"
    class="fixed inset-0 z-50 backdrop-blur-xs"
    aria-hidden="true"
    aria-busy="true"
    role="status"
  >
    <div class="flex items-center justify-center h-screen w-screen">
      <svg
        class="w-12 h-12 animate-spin"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          stroke-opacity="0.25"
          stroke-width="5"
        ></circle>
        <path
          d="M45 25a20 20 0 0 1-20 20"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
        ></path>
      </svg>
    </div>
  </div>
</template>
