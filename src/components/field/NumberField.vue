<script setup lang="ts">
import {
  FloatLabel,
  InputGroup,
  InputGroupAddon,
  InputNumber,
  Message,
} from "primevue";

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
  <InputGroup>
    <InputGroupAddon v-if="prefix"> {{ prefix }} </InputGroupAddon>
    <FloatLabel variant="on">
      <InputNumber
        v-model="model"
        :inputId="name"
        :minFractionDigits="minDecimalDigits"
        :maxFractionDigits="maxDecimalDigits"
        fluid
        :class="{ 'p-invalid': !!error(name) }"
      />
      <label :for="name">{{ label }}</label>
    </FloatLabel>
    <InputGroupAddon v-if="suffix"> {{ suffix }} </InputGroupAddon>
  </InputGroup>
  <Message severity="error" size="small" variant="simple" class="h-4">
    {{ error(name) }}
  </Message>
</template>
