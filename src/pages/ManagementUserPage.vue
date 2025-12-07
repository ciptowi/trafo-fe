<script setup lang="ts">
import Header from "../components/Header.vue";
import PaginationControl from "../components/app/PaginationControl.vue";
import SearchField from "../components/field/SearchField.vue";
import CardView from "../components/app/CardView.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import TextField from "../components/field/TextField.vue";
import useValidation from "../utils/zod-validation";
import type { RowTrafoRes } from "../api/trafo-api";
import { DataTable, Column, Dialog } from "primevue";
import { onMounted, reactive, ref } from "vue";
import { userService } from "../service/user-service";
import { useConfirmation, usePopup } from "../components/app/dialog-state";
import { requiredString } from "../utils/zod-helper";
import { z } from "zod";

type Mode = "add" | "edit" | "password";
type DataRow = { id: number; username: string };

const visible = ref(false);
const mode = ref<Mode>("add");
const tableRows = ref<RowTrafoRes[]>([]);
const pagination = reactive({
  page: 0,
  first: 0,
  totalRecords: 0,
});

const formUser = reactive({
  id: 0,
  username: "",
  oldPassword: "",
  password: "",
});

const schemaForAdd = z.object({
  username: requiredString("Username"),
  password: requiredString("Password"),
});
const schemaForEdit = z.object({
  username: requiredString("Username"),
});
const schemaForEditPass = z.object({
  oldPassword: requiredString("Old Password"),
  password: requiredString("Password"),
});

const validationAdd = useValidation(schemaForAdd, formUser, { mode: "lazy" });
const validationEdit = useValidation(schemaForEdit, formUser, { mode: "lazy" });
const validationEditPass = useValidation(schemaForEditPass, formUser, {
  mode: "lazy",
});

async function getDataTable(keyword?: string) {
  const result = await userService.findAll(keyword || null, pagination);
  tableRows.value = result.data;
}

function eventSearch(keyword?: string) {
  if (keyword) {
    pagination.page = 0;
    pagination.first = 0;
  }
  getDataTable(keyword);
}

function openDialogForm(dialogMode: Mode, row?: DataRow) {
  visible.value = true;
  mode.value = dialogMode;
  formUser.id = row?.id || 0;
  formUser.username = row?.username || "";
  formUser.oldPassword = "";
  formUser.password = "";
}

function handleDelete(row: DataRow) {
  if (row.id === 0) return;

  useConfirmation({
    message: "Are you sure you want to delete this User ?",
    title: `Delete ${row.username}`,
    btnOkText: "Delete",
    btnOkColor: "danger",
  }).then((ok) => {
    if (!ok) return;
    userService.delete(row.id).then(() => {
      usePopup({
        type: "success",
        message: "User deleted successfully",
      });
      visible.value = false;
      getDataTable();
    });
  });
}

function submitForm() {
  switch (mode.value) {
    case "add":
      validationAdd.validate().then(() => {
        if (!validationAdd.isValid.value) return;
        userService.create(formUser).then(() => {
          visible.value = false;
          usePopup({
            type: "success",
            message: "User saved successfully",
          });
          getDataTable();
        });
      });
      break;
    case "edit":
      validationEdit.validate().then(() => {
        if (!validationEdit.isValid.value) return;
        userService.updateUsername(formUser).then(() => {
          visible.value = false;
          usePopup({
            type: "success",
            message: "User updated successfully",
          });
          getDataTable();
        });
      });
      break;
    case "password":
      validationEditPass.validate().then(() => {
        if (!validationEditPass.isValid.value) return;
        userService.updatePassword(formUser).then(() => {
          visible.value = false;
          usePopup({
            type: "success",
            message: "User password updated successfully",
          });
          getDataTable();
        });
      });
      break;
  }
}

onMounted(() => {
  getDataTable();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="System Management Gardu Distribusi PT PLN (Persero)" />
    <NavigationMenu />

    <CardView class="m-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-between w-1/2 gap-2">
          <div class="w-1/2">
            <SearchField @submit="eventSearch" />
          </div>
        </div>

        <Button
          label="Add New User"
          icon="pi pi-plus"
          rounded
          @click="openDialogForm('add')"
        />
      </div>
    </CardView>

    <CardView class="mx-4">
      <DataTable :value="tableRows" tableStyle="min-width: 50rem">
        <template #empty>
          <div class="flex items-center justify-center h-42">
            <div class="text-center">
              <i class="pi pi-database text-gray-500"></i>
              <div class="text-gray-500">No Data</div>
            </div>
          </div>
        </template>

        <Column field="" header="No">
          <template #body="{ index }">
            {{ pagination.first + index + 1 }}
          </template>
        </Column>
        <Column field="username" header="Username"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="action" header="Action">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <Button
                icon="pi pi-pen-to-square"
                severity="success"
                size="small"
                rounded
                aria-label="Edit User"
                @click="openDialogForm('edit', data)"
              />
              <Button
                icon="pi pi-key"
                severity="warn"
                size="small"
                rounded
                aria-label="Edit Password"
                @click="openDialogForm('password', data)"
              />
              <Button
                icon="pi pi-trash"
                severity="danger"
                size="small"
                rounded
                aria-label="Delete User"
                @click="handleDelete(data)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </CardView>

    <PaginationControl v-model="pagination" @change="getDataTable()" />

    <Dialog
      v-model:visible="visible"
      modal
      :header="`${mode == 'add' ? 'Add New' : 'Edit'} User`"
      :style="{ width: '35rem' }"
    >
      <form class="mt-4 flex flex-col space-y-1" @submit.prevent="submitForm">
        <template v-if="mode == 'add'">
          <TextField
            v-model="formUser.username"
            label="Username"
            name="username"
            :error="validationAdd.getError"
          />
          <TextField
            v-model="formUser.password"
            label="Password"
            name="password"
            :error="validationAdd.getError"
          />
        </template>

        <template v-if="mode == 'edit'">
          <TextField
            v-model="formUser.username"
            label="Username"
            name="username"
            :error="validationEdit.getError"
          />
        </template>

        <template v-if="mode == 'password'">
          <TextField
            v-model="formUser.oldPassword"
            label="Current Password"
            name="oldPassword"
            :error="validationEditPass.getError"
          />
          <TextField
            v-model="formUser.password"
            label="New Password"
            name="password"
            :error="validationEditPass.getError"
          />
        </template>
      </form>

      <template #footer>
        <div class="pt-2 flex justify-end gap-2">
          <Button
            label="Cancel"
            severity="secondary"
            @click="visible = false"
          />
          <Button
            :label="mode == 'add' ? 'Save' : 'Edit'"
            @click="submitForm"
          />
        </div>
      </template>
    </Dialog>
  </div>
</template>
