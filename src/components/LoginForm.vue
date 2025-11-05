<script setup lang="ts">
import Card from "primevue/card";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Message from "primevue/message";
import Button from "primevue/button";
import useValidation from "../utils/zod-validation";
import type { LoginField } from "../types/auth-type";
import { ref } from "vue";
import { z } from "zod";
import { requiredString } from "../utils/zod-helper";

const emit = defineEmits<{ (e: "submit"): void }>();
const form = defineModel<LoginField>({ required: true });

const showPass = ref(false);

const validationSchema = z.object({
  username: requiredString("Username"),
  password: requiredString("Password"),
});

const { validate, isValid, getError } = useValidation(validationSchema, form, {
  mode: "lazy",
});

const submitForm = () => {
  validate().then(() => {
    if (isValid.value) emit("submit");
  });
};
</script>

<template>
  <Card class="w-1/3 shadow-2xl border border-gray-200">
    <template #title>
      <div class="text-center text-2xl">Login</div>
    </template>

    <template #content>
      <div class="h-14 py-auto">
        <Message
          v-if="form.errorMessage"
          size="small"
          severity="error"
          class="h-6"
        >
          {{ form.errorMessage }}
        </Message>
      </div>

      <form class="flex flex-col space-y-4" @submit.prevent="submitForm">
        <div>
          <FloatLabel variant="on">
            <InputText
              id="username"
              v-model="form.username"
              :class="{ 'p-invalid': !!getError('username') }"
              class="w-full"
            />
            <label for="username">Username</label>
          </FloatLabel>
          <Message severity="error" size="small" variant="simple" class="h-4">
            {{ getError("username") }}
          </Message>
        </div>

        <div>
          <InputGroup>
            <FloatLabel variant="on">
              <InputText
                id="password"
                v-model="form.password"
                :type="showPass ? 'text' : 'password'"
                :class="{ 'p-invalid': !!getError('password') }"
                class="w-full"
              />
              <label for="password">Password</label>
            </FloatLabel>
            <InputGroupAddon
              class="cursor-pointer"
              @click="showPass = !showPass"
            >
              <i v-if="showPass" class="pi pi-eye"></i>
              <i v-else class="pi pi-eye-slash"></i>
            </InputGroupAddon>
          </InputGroup>
          <Message severity="error" size="small" variant="simple" class="h-4">
            {{ getError("password") }}
          </Message>
        </div>

        <div class="block mt-8">
          <Button type="submit" class="w-full" rounded label="LOGIN" />
        </div>
      </form>
    </template>
  </Card>
</template>
