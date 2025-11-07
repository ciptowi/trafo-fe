<script setup lang="ts">
import { Dialog } from "primevue";
import { dialog, dialogConfig as config, confirmAction } from "./dialog-state";
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
</template>
