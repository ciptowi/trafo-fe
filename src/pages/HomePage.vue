<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "../utils/auth-storage";

const router = useRouter();

onMounted(() => {
  if (!getAuth()) {
    router.push({ name: "login" });
  } else {
    router.push({ name: "trafo" });
  }
});
</script>

<template>
  <div></div>
</template>
