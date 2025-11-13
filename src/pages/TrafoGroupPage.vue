<script setup lang="ts">
import Header from "../components/Header.vue";
import TrafoGroupControl from "../components/trafo/TrafoGroupControl.vue";
import PaginationControl from "../components/app/PaginationControl.vue";
import SearchField from "../components/field/SearchField.vue";
import CardView from "../components/app/CardView.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import type { RowTrafoGroupRes } from "../api/trafo-group-api";
import { DataTable, Column } from "primevue";
import { onMounted, reactive, ref } from "vue";
import { trafoGroupService } from "../service/trafo-group-service";

const tableRows = ref<RowTrafoGroupRes[]>([]);
const pagination = reactive({
  page: 0,
  first: 0,
  totalRecords: 0,
});

async function getDataTable(keyword?: string) {
  const result = await trafoGroupService.findAll({
    q: keyword || null,
    page: pagination.page,
    size: 10,
  });
  tableRows.value = result.data;
  pagination.totalRecords = result.total;
}

function eventSearch(keyword?: string) {
  if (keyword) {
    pagination.page = 0;
    pagination.first = 0;
  }
  getDataTable(keyword);
}

onMounted(() => {
  getDataTable();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="System Management Gardu Distribusi PT PLN (Persero)" />
    <NavigationMenu />

    <CardView class="my-4">
      <div class="flex items-center justify-between">
        <div class="w-1/4">
          <SearchField @submit="getDataTable" />
        </div>
        <TrafoGroupControl use="create" @created="eventSearch" />
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
    </CardView>

    <PaginationControl v-model="pagination" @change="getDataTable()" />
  </div>
</template>
