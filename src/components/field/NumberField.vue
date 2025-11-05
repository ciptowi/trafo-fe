<script setup lang="ts">
import { FloatLabel, InputNumber, Message } from "primevue";

defineProps<{
  label: string;
  name: string;
  error: Function;
  prefix?: string;
  suffix?: string;
  minDecimalDigits?: number;
  maxDecimalDigits?: number;
}>();
const model = defineModel<number | null>({ required: true });
</script>

<template>
  <div>
    <FloatLabel variant="on">
      <InputNumber
        v-model="model"
        :inputId="name"
        :minFractionDigits="minDecimalDigits"
        :maxFractionDigits="maxDecimalDigits"
        :prefix="prefix"
        :suffix="suffix"
        fluid
        :class="{ 'p-invalid': !!error(name) }"
      />
      <label :for="name">{{ label }}</label>
    </FloatLabel>
    <Message severity="error" size="small" variant="simple" class="h-4">
      {{ error(name) }}
    </Message>
  </div>
</template>
