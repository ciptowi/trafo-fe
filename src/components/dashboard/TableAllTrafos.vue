<script setup lang="ts">
import CardView from "../../components/app/CardView.vue";
import { DataTable, Column } from "primevue";
import { onMounted, ref } from "vue";
import { dashboardService } from "../../service/dashboard-service";
import type { TrafoRows } from "../../types/dashboard-type";

const emits = defineEmits<{ (e: "detail", id: number): void }>();

const tableRows = ref<TrafoRows[]>([]);

async function getDataTable() {
  const result = await dashboardService.trafoList();
  tableRows.value = result;
}

onMounted(() => {
  getDataTable();
});
</script>

<template>
  <CardView>
    <DataTable :value="tableRows" tableStyle="font-size: 0.8rem">
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
          {{ index + 1 }}
        </template>
      </Column>
      <Column field="group" header="Trafo Group"></Column>
      <Column field="name" header="Trafo Name"></Column>
      <Column field="capacity" header="Capacity"></Column>
      <Column field="action" header="Action">
        <template #body="{ data }">
          <Button
            icon="pi pi-chart-line"
            severity="primary"
            size="small"
            rounded
            aria-label="Trafo Detail"
            @click="emits('detail', data.id)"
          />
        </template>
      </Column>
    </DataTable>
  </CardView>
</template>
