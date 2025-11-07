<script setup lang="ts">
import Header from "../components/Header.vue";
import TrafoGroupControl from "../components/trafo/TrafoGroupControl.vue";
import type { RowTrafoGroupRes } from "../api/trafo-group-api";
import { Card, Toolbar, DataTable, Column } from "primevue";
import { onMounted, ref } from "vue";
import { trafoGroupService } from "../service/trafo-group-service";

const products = ref<RowTrafoGroupRes[]>([]);

async function getDataTable() {
  try {
    const result = await trafoGroupService.findAll({
      q: null,
      page: 0,
      size: 10,
    });
    products.value = result;
  } catch (error) {}
}

onMounted(() => {
  getDataTable();
});
</script>

<template>
  <Header title="Trafo Group Management" />

  <Toolbar class="rounded-2xl! my-4 mx-4">
    <template #start>
      <div class="flex items-center gap-2"></div>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <TrafoGroupControl use="create" @created="getDataTable" />
      </div>
    </template>
  </Toolbar>

  <Card class="mx-4 border border-gray-200">
    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <template #empty>
          <div class="flex items-center justify-center h-42">
            <div class="text-center">
              <i class="pi pi-database text-gray-500"></i>
              <div class="text-gray-500">No Data</div>
            </div>
          </div>
        </template>

        <Column field="" header="No">
          <template #body="{ index }"> {{ index + 1 }} </template>
        </Column>
        <Column field="name" header="Trafo Group Name"></Column>
        <Column field="kodegrup" header="Group Code"></Column>
        <Column field="action" header="Action">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <TrafoGroupControl
                use="update"
                :data="data"
                @updated="getDataTable"
              />
              <TrafoGroupControl
                use="delete"
                :data="data"
                @deleted="getDataTable"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
