<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
import type { LoginField } from "../types/auth-type";
import { onMounted, reactive, ref } from "vue";
import { authService } from "../service/auth-service";
import { useRoute } from "vue-router";

const formElement = ref<InstanceType<typeof LoginForm>>();
const route = useRoute();

const form = reactive<LoginField>({
  username: "",
  password: "",
  errorMessage: "",
});

const submit = () => {
  authService.login(form);
};

onMounted(() => {
  if (route.query.message) {
    form.errorMessage = route.query.message as string;
  }
});
</script>

<template>
  <div
    class="flex justify-center items-center h-screen bg-linear-to-br from-sky-50 via-sky-100 to-sky-300"
  >
    <LoginForm ref="formElement" v-model="form" @submit="submit" />
  </div>
</template>
