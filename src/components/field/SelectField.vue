<script setup lang="ts">
import { FloatLabel, Message, Select } from "primevue";
import type { Combobox } from "../../types/global-type";
import { onMounted, ref } from "vue";
import { trafoGroupService } from "../../service/trafo-group-service";

const props = defineProps<{
  use: "trafo-group";
  label: string;
  name: string;
  clearable?: boolean;
  mounted?: boolean;
  error?: Function;
}>();
const model = defineModel<Combobox | null>({ required: true });

const options = ref<Combobox[]>([]);

async function getData() {
  switch (props.use) {
    case "trafo-group":
      trafoGroupService.combobox().then((res) => {
        options.value = res;
      });
      break;
  }
}

onMounted(() => {
  if (props.mounted) {
    getData();
  }
});
</script>

<template>
  <div>
    <FloatLabel variant="on">
      <Select
        v-model="model"
        fluid
        :id="name"
        :name="name"
        :options="options"
        optionLabel="name"
        :showClear="props.clearable"
        :class="{ 'p-invalid': error && !!error(name) }"
        class="w-full"
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
