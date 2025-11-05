<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
import type { LoginField } from "../types/auth-type";
import { reactive, ref } from "vue";
import { authService } from "../service/auth-service";

const formElement = ref<InstanceType<typeof LoginForm>>();

const form = reactive<LoginField>({
  username: "",
  password: "",
  errorMessage: "",
});

const submit = () => {
  authService.login(form);
};
</script>

<template>
  <div
    class="flex justify-center items-center h-screen bg-linear-to-br from-sky-50 via-sky-100 to-sky-300"
  >
    <LoginForm ref="formElement" v-model="form" @submit="submit" />
  </div>
</template>
