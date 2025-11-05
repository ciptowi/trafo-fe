<script setup lang="ts">
import { FloatLabel, InputMask, Message } from "primevue";

defineProps<{
  label: string;
  name: string;
  mask: string;
  placeholder?: string;
  error: Function;
}>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <div>
    <FloatLabel variant="on">
      <InputMask
        :id="name"
        v-model="model"
        :mask="mask"
        :placeholder="placeholder"
        :class="{ 'p-invalid': !!error(name) }"
        class="w-full"
      />
      <label :for="name">{{ label }}</label>
    </FloatLabel>
    <Message severity="error" size="small" variant="simple" class="h-4">
      {{ error(name) }}
    </Message>
  </div>
</template>
