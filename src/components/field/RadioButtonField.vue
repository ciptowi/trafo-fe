<script setup lang="ts">
import { Message, RadioButton, RadioButtonGroup } from "primevue";

type Item = { label: string; value: string };

defineProps<{
  label: string;
  name: string;
  items: Item[];
  error: Function;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
  <div>
    <div>
      <label :for="name">Phase</label>
    </div>
    <RadioButtonGroup v-model="model" :name="name" class="flex flex-wrap gap-4">
      <div v-for="item in items" class="flex items-center gap-2">
        <RadioButton
          :inputId="item.value"
          :value="item.value"
          :class="{ 'p-invalid': !!error(name) }"
        />
        <label :for="item.value">{{ item.label }}</label>
      </div>
    </RadioButtonGroup>
    <Message severity="error" size="small" variant="simple" class="h-4">
      {{ error(name) }}
    </Message>
  </div>
</template>
