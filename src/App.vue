<script setup lang="ts">
import { Toast } from "primevue";
import DialogComponent from "./components/app/DialogComponent.vue";
import OverlaySpiner from "./components/app/OverlaySpiner.vue";
</script>

<template>
  <RouterView />
  <Toast />
  <DialogComponent />
  <OverlaySpiner />
</template>
