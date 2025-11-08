<script setup lang="ts">
import { FloatLabel, InputText, Message } from "primevue";

defineProps<{ label: string; name: string; error?: Function }>();
const model = defineModel<string>({ required: true });
</script>

<template>
  <div>
    <FloatLabel variant="on">
      <InputText
        :id="name"
        v-model="model"
        :class="{ 'p-invalid': error && !!error(name) }"
        class="w-full"
        @submit="console.log('as')"
      />
      <label :for="name">{{ label }}</label>
    </FloatLabel>
    <Message
      v-if="error"
      severity="error"
      size="small"
      variant="simple"
      class="h-4"
    >
      {{ error(name) }}
    </Message>
  </div>
</template>
