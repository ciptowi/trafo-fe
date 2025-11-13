<script setup lang="ts">
import { Dialog } from "primevue";
import {
  alert,
  dialog,
  dialogConfig as config,
  confirmAction,
} from "./dialog-state";
</script>

<template>
  <Dialog
    v-model:visible="dialog.visible"
    modal
    :header="dialog.title"
    :style="{ width: '25rem' }"
  >
    <div class="py-4">
      <div>{{ dialog.message }}</div>
    </div>

    <template #footer>
      <div class="pt-2 flex justify-end gap-2">
        <Button
          :label="config.btnCancelText || 'Cancel'"
          :severity="config.btnCancelColor || 'secondary'"
          @click="confirmAction(false)"
        />
        <Button
          :label="config.btnOkText || 'Save'"
          :severity="config.btnOkColor"
          @click="confirmAction(true)"
        />
      </div>
    </template>
  </Dialog>

  <Dialog
    v-model:visible="alert.visible"
    modal
    :closable="alert.type == 'error'"
    :header="alert.title"
    :style="{ width: '25rem' }"
  >
    <div class="flex justify-center items-center">
      <div class="flex flex-col items-center">
        <div
          v-if="alert.type == 'error'"
          class="w-18 h-18 border-4 border-red-500 rounded-full flex justify-center items-center"
        >
          <i
            class="pi pi-exclamation-triangle text-red-500"
            style="font-size: 2.5rem"
          ></i>
        </div>

        <div
          v-if="alert.type == 'success'"
          class="w-18 h-18 border-4 border-green-500 rounded-full flex justify-center items-center"
        >
          <i
            class="pi pi-check-circle text-green-500"
            style="font-size: 2.5rem"
          ></i>
        </div>

        <div class="py-8">
          <div>{{ alert.message }}</div>
        </div>
      </div>
    </div>
  </Dialog>
</template>
