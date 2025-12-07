<script setup lang="ts">
import { FloatLabel, InputText, Message } from "primevue";

const props = defineProps<{
  label: string;
  name: string;
  disabled?: boolean;
  error?: Function;
}>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <div>
    <FloatLabel variant="on">
      <InputText
        :id="props.name"
        v-model="model"
        :disabled="props.disabled"
        :class="{ 'p-invalid': error && !!error(props.name) }"
        class="w-full"
        @submit="console.log('as')"
      />
      <label :for="props.name">{{ label }}</label>
    </FloatLabel>
    <Message
      v-if="error"
      severity="error"
      size="small"
      variant="simple"
      class="h-4"
    >
      {{ error(props.name) }}
    </Message>
  </div>
</template>
