<script setup lang="ts">
import { Button, Dialog } from "primevue";
import { reactive, ref } from "vue";
import { requiredString } from "../../utils/zod-helper";
import { useAlert } from "../../utils/toast-helper";
import { trafoGroupService } from "../../service/trafo-group-service";
import { z } from "zod";
import type { TrafoGroupModel } from "../../types/trafo-group-type";
import type { RowTrafoGroupRes } from "../../api/trafo-group-api";
import useValidation from "../../utils/zod-validation";
import TextField from "../field/TextField.vue";
import { useConfirmation } from "../app/dialog-state";

const emit = defineEmits<{
  (e: "updated"): void;
  (e: "created"): void;
  (e: "deleted"): void;
}>();
const props = defineProps<{
  use: "create" | "update" | "delete";
  data?: RowTrafoGroupRes;
}>();

const alert = useAlert();

const visible = ref(false);
const form = reactive<TrafoGroupModel>({
  id: 0,
  name: "",
  code: "",
});

const validationSchema = z.object({
  name: requiredString("Name"),
  code: requiredString("Kode Group"),
});

const { validate, isValid, getError } = useValidation(validationSchema, form, {
  mode: "lazy",
});

function submitForm() {
  validate().then(() => {
    if (isValid.value) {
      if (props.use == "create") {
        trafoGroupService
          .save(form)
          .then(() => {
            alert.success("Trafo Group saved successfully");
            visible.value = false;
            emit("created");
          })
          .catch((e) => alert.error(e));
      }
      if (props.use == "update") {
        trafoGroupService
          .update(form.id, form)
          .then(() => {
            alert.success("Trafo Group updated successfully");
            visible.value = false;
            emit("updated");
          })
          .catch((e) => alert.error(e));
      }
    }
  });
}

function getDetailTrafoGroup() {
  if (props.data) {
    visible.value = true;
    form.id = props.data.id;
    form.name = props.data.name;
    form.code = props.data.kodegrup;
  }
}

function resetForm(show = false) {
  form.id = 0;
  form.name = "";
  form.code = "";
  visible.value = show;
}

function handleDelete() {
  if (!props.data) return;

  const id = props.data.id;
  useConfirmation({
    message: "Are you sure you want to delete this Trafo Group ?",
    title: `Delete ${props.data.name}`,
    btnOkText: "Delete",
    btnOkColor: "danger",
  }).then((ok) => {
    if (!ok) return;
    trafoGroupService.delete(id).then(() => {
      alert.success("Trafo Group deleted successfully");
      emit("deleted");
    });
  });
}
</script>

<template>
  <Button
    v-if="props.use == 'create'"
    label="Add New Trafo Group"
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
    aria-label="Edit Trafo Group"
    @click="getDetailTrafoGroup"
  />

  <Button
    v-if="props.use == 'delete'"
    icon="pi pi-trash"
    severity="danger"
    size="small"
    rounded
    aria-label="Delete"
    @click="handleDelete"
  />

  <Dialog
    v-model:visible="visible"
    modal
    :header="`${props.use == 'create' ? 'Add New' : 'Edit'} Trafo Group`"
    :style="{ width: '35rem' }"
  >
    <form class="mt-4 flex flex-col space-y-1" @submit.prevent="submitForm">
      <TextField
        v-model="form.name"
        label="Name"
        name="name"
        :error="getError"
      />
      <TextField
        v-model="form.code"
        label="Kode Group"
        name="code"
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
