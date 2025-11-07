<script setup lang="ts">
import { Toast } from "primevue";
import DialogConfirmation from "./components/app/DialogConfirmation.vue";
</script>

<template>
  <RouterView />
  <Toast />
  <DialogConfirmation />
</template>
