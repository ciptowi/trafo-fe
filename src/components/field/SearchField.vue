<script setup lang="ts">
import { FloatLabel, InputGroup, InputGroupAddon, InputText } from "primevue";
import { ref } from "vue";

const emit = defineEmits<{ (e: "submit", value?: string): void }>();
const model = ref("");

function eventClear() {
  model.value = "";
  emit("submit");
}
</script>

<template>
  <InputGroup>
    <FloatLabel variant="on">
      <InputText
        id="search"
        v-model="model"
        class="w-full"
        placeholder="Search ..."
      />
    </FloatLabel>
    <InputGroupAddon v-if="model" class="cursor-pointer" @click="eventClear">
      <i class="pi pi-times"></i>
    </InputGroupAddon>
    <InputGroupAddon class="cursor-pointer" @click="emit('submit', model)">
      <i class="pi pi-search"></i>
    </InputGroupAddon>
  </InputGroup>
</template>
