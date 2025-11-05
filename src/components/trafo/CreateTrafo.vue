<script setup lang="ts">
import { reactive, ref } from "vue";
import { z } from "zod";
import { Button, Dialog } from "primevue";
import { requiredNumber, requiredString } from "../../utils/zod-helper";
import type { TrafoModel } from "../../types/trafo-type";
import useValidation from "../../utils/zod-validation";
import TextField from "../field/TextField.vue";
import RadioButtonField from "../field/RadioButtonField.vue";
import NumberField from "../field/NumberField.vue";
import MaskField from "../field/MaskField.vue";

const visible = ref(false);

const form = reactive<TrafoModel>({
  id: "",
  name: "",
  phase: "",
  brand: "",
  type: "",
  voltage: "",
  current: "",
  capacity: null,
  latitude: null,
  longitude: null,
});

const validationSchema = z.object({
  name: requiredString("Name"),
  phase: requiredString("Phase"),
  brand: requiredString("Brand"),
  type: requiredString("Type"),
  voltage: requiredString("Voltage"),
  current: requiredString("Current"),
  capacity: requiredNumber("Capacity"),
  latitude: requiredNumber("Latitude"),
  longitude: requiredNumber("Longitude"),
});

const { validate, isValid, getError } = useValidation(validationSchema, form, {
  mode: "lazy",
});

const submitForm = () => {
  validate().then(() => {
    if (isValid.value) console.log("");
  });
};
</script>

<template>
  <Button label="Add New Trafo" icon="pi pi-plus" @click="visible = true" />

  <Dialog
    v-model:visible="visible"
    modal
    header="Add New Trafo"
    :style="{ width: '35rem' }"
  >
    <form class="mt-4 flex flex-col space-y-1" @submit.prevent="submitForm">
      <TextField
        v-model="form.name"
        label="Name"
        name="name"
        :error="getError"
      />
      <RadioButtonField
        v-model="form.phase"
        label="Phase"
        name="phase"
        :items="[
          { label: '1 Phase', value: '1' },
          { label: '3 Phase', value: '3' },
        ]"
        :error="getError"
      />
      <TextField
        v-model="form.brand"
        label="Brand"
        name="brand"
        :error="getError"
      />
      <TextField
        v-model="form.type"
        label="Type"
        name="type"
        :error="getError"
      />

      <label>Ratio Transformers</label>
      <div class="grid grid-cols-2 gap-4">
        <MaskField
          v-model="form.voltage"
          label="Voltage (VT)"
          name="voltage"
          mask="9:9"
          placeholder="1:1"
          :error="getError"
        />
        <MaskField
          v-model="form.current"
          label="Current (CT)"
          name="current"
          mask="9:9"
          placeholder="1:1"
          :error="getError"
        />
      </div>

      <NumberField
        v-model="form.capacity"
        label="Capacity"
        name="capacity"
        suffix=" KVA"
        :error="getError"
      />
      <NumberField
        v-model="form.latitude"
        label="Latitude"
        name="latitude"
        :maxDecimalDigits="6"
        :error="getError"
      />
      <NumberField
        v-model="form.longitude"
        label="Longitude"
        name="longitude"
        :maxDecimalDigits="6"
        :error="getError"
      />
    </form>

    <template #footer>
      <div class="pt-2 flex justify-end gap-2">
        <Button label="Cancel" severity="secondary" @click="visible = false" />
        <Button label="Save" @click="submitForm" />
      </div>
    </template>
  </Dialog>
</template>
