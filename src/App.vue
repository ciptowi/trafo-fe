<script setup lang="ts">
import { Toast } from "primevue";
import DialogComponent from "./components/app/DialogComponent.vue";
</script>

<template>
  <RouterView />
  <Toast />
  <DialogComponent />
</template>
