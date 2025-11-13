<script setup lang="ts">
import { Button, DataTable, Column } from "primevue";
import { reactive, ref } from "vue";
import CardView from "../app/CardView.vue";
import SearchField from "../field/SearchField.vue";
import PaginationControl from "../app/PaginationControl.vue";
import { calculationService } from "../../service/calculation-service";
import { usePopup } from "../app/dialog-state";

const props = defineProps<{ id: number; capacity: number }>();

const fileInput = ref<InstanceType<typeof HTMLInputElement>>();

const tableRows = ref([]);
const pagination = reactive({
  page: 0,
  first: 0,
  totalRecords: 0,
});

function chooseFile() {
  fileInput.value?.click();
}

function uploadFile() {
  if (fileInput.value?.files) {
    for (const file of fileInput.value.files) {
      calculationService.uploadCsv(props.id, props.capacity, file).then(() => {
        usePopup({
          type: "success",
          message: "File uploaded successfully",
        });
        window.location.reload();
      });
    }
  }
}

const users = ref([
  { id: 1, name: "Budi", email: "budi@example.com", age: 25 },
  { id: 2, name: "Siti", email: "siti@example.com", age: 30 },
  { id: 3, name: "Asep", email: "asep@example.com", age: 22 },
]);

const exportToCSV = () => {
  if (!users.value || users.value.length === 0) {
    alert("Tidak ada data untuk diekspor!");
    return;
  }

  const data = users.value;
  const headers = ["id", "name", "email", "age"];
  const csvHeaders = headers.join(",");

  const csvRows = data.map((item: any) => {
    const values = headers.map((header) => {
      let value = item[header];
      if (
        typeof value === "string" &&
        (value.includes(",") || value.includes('"') || value.includes("\n"))
      ) {
        value = `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    return values.join(",");
  });

  const finalCsvString = [csvHeaders, ...csvRows].join("\n");

  const blob = new Blob([finalCsvString], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    "data_export_" +
      new Date().toLocaleDateString("id-ID").replace(/\//g, "-") +
      ".csv"
  );

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};
</script>

<template>
  <CardView class="m-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center justify-between w-1/2 gap-2">
        <div class="w-1/2">
          <SearchField />
        </div>
        <div class="w-1/2"></div>
      </div>

      <div class="flex items-center gap-4">
        <Button
          icon="pi pi-file-import"
          severity="primary"
          size="small"
          rounded
          label="Import"
          @click="chooseFile"
        />
        <Button
          icon="pi pi-file-export"
          severity="success"
          size="small"
          rounded
          label="Export"
          @click="exportToCSV"
        />
      </div>
    </div>
  </CardView>

  <input
    ref="fileInput"
    accept="text/csv"
    type="file"
    style="display: none"
    @change="uploadFile"
  />

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
      <Column field="number" header="Customer Number"></Column>
      <Column field="power" header="Power"></Column>
      <Column field="current" header="Current"> </Column>
      <Column field="installation" header="Installation"> </Column>
      <Column field="created_at" header="Created At"> </Column>
      <Column field="action" header="Action"> </Column>
    </DataTable>
  </CardView>

  <PaginationControl v-model="pagination" />
</template>
