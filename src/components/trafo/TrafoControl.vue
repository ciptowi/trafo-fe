<script setup lang="ts">
import { reactive, ref } from "vue";
import { Button, Dialog } from "primevue";
import { trafoService } from "../../service/trafo-service";
import { useAlert } from "../../utils/toast-helper";
import { requiredNumber, requiredString } from "../../utils/zod-helper";
import { z } from "zod";
import type { TrafoModel } from "../../types/trafo-type";
import type { RowTrafoRes } from "../../api/trafo-api";
import type { Combobox } from "../../types/global-type";
import useValidation from "../../utils/zod-validation";
import NumberField from "../field/NumberField.vue";
import MaskField from "../field/MaskField.vue";
import TextField from "../field/TextField.vue";
import RadioButtonField from "../field/RadioButtonField.vue";

const emit = defineEmits<{
  (e: "updated"): void;
  (e: "created"): void;
}>();
const props = defineProps<{
  use: "create" | "update";
  group?: Combobox | null;
  data?: RowTrafoRes;
}>();
const alert = useAlert();

const visible = ref(false);
const form = reactive<TrafoModel>({
  id: 0,
  name: "",
  phase: "",
  brand: "",
  type: "",
  voltage: "",
  current: "",
  capacity: null,
  latitude: null,
  longitude: null,
  group_id: null,
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

function submitForm() {
  switch (props.use) {
    case "create":
      validate().then(() => {
        if (!isValid.value) return;
        form.group_id = props.group?.id || null;
        trafoService
          .save(form)
          .then(() => {
            visible.value = false;
            alert.success("Trafo saved successfully");
            emit("created");
          })
          .catch((e) => alert.error(e));
      });
      break;
    case "update":
      validate().then(() => {
        if (!isValid.value) return;
        trafoService
          .update(form)
          .then(() => {
            visible.value = false;
            alert.success("Trafo updated successfully");
            emit("updated");
          })
          .catch((e) => alert.error(e));
      });
      break;
  }
}

function getDetailTrafo() {
  if (!props.data) return;
  visible.value = true;
  form.id = props.data.id;
  form.name = props.data.name;
  form.phase = props.data.phasa;
  form.brand = props.data.brand;
  form.type = props.data.type;
  form.voltage = props.data.voltase.toString();
  form.current = props.data.current.toString();
  form.capacity = props.data.kapasitas;
  form.latitude = props.data.latitude;
  form.longitude = props.data.longitude;
  form.group_id = props.data.group_id;
}

function resetForm(isShow = false) {
  visible.value = isShow;
  form.id = 0;
  form.name = "";
  form.phase = "";
  form.brand = "";
  form.type = "";
  form.voltage = "";
  form.current = "";
  form.capacity = null;
  form.latitude = null;
  form.longitude = null;
  form.group_id = null;
}
</script>

<template>
  <Button
    v-if="props.use == 'create'"
    label="Add New Trafo"
    icon="pi pi-plus"
    rounded
    @click="resetForm(true)"
  />

  <Button
    v-if="props.use == 'update'"
    icon="pi pi-pen-to-square"
    severity="warn"
    size="small"
    rounded
    aria-label="Edit Trafo"
    @click="getDetailTrafo"
  />

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
          { label: '1 Phase', value: '1 Phase' },
          { label: '3 Phase', value: '3 Phase' },
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
