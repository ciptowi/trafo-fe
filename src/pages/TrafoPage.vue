<script setup lang="ts">
import Header from "../components/Header.vue";
import TrafoControl from "../components/trafo/TrafoControl.vue";
import SelectField from "../components/field/SelectField.vue";
import PaginationControl from "../components/app/PaginationControl.vue";
import SearchField from "../components/field/SearchField.vue";
import CardView from "../components/app/CardView.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import type { RowTrafoRes } from "../api/trafo-api";
import type { Combobox } from "../types/global-type";
import { Button, DataTable, Column } from "primevue";
import { computed, onMounted, reactive, ref } from "vue";
import { trafoService } from "../service/trafo-service";
import { useRouter } from "vue-router";
import { getUser } from "../utils/auth-storage";

const router = useRouter();

const tableRows = ref<RowTrafoRes[]>([]);
const group = ref<Combobox | null>(null);
const pagination = reactive({
  page: 0,
  first: 0,
  totalRecords: 0,
});

const userGroup = computed(() =>
  getUser().group_id
    ? { id: getUser().group_id || 0, name: getUser().group_name || "" }
    : null
);

async function getDataTable(keyword?: string) {
  const result = await trafoService.findAll({
    q: keyword || null,
    groupId: group.value?.id || null,
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
  if (userGroup.value) {
    group.value = userGroup.value;
    getDataTable();
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="System Management Gardu Distribusi PT PLN (Persero)" />
    <NavigationMenu />

    <CardView class="m-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-between w-1/2 gap-2">
          <div v-if="!userGroup" class="w-1/2">
            <SelectField
              mounted
              v-model="group"
              use="trafo-group"
              name="group"
              label="Trafo Group"
              @update:model-value="getDataTable()"
            />
          </div>
          <div class="w-1/2">
            <SearchField v-if="group" @submit="eventSearch" />
          </div>
        </div>

        <TrafoControl
          v-if="group"
          use="create"
          :group="group"
          @created="getDataTable"
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
        <Column field="name" header="Trafo Name"></Column>
        <Column field="kapasitas" header="Capacity">
          <template #body="{ data }">
            <div>{{ data.kapasitas }} KVA</div>
          </template>
        </Column>
        <Column field="phasa" header="Phase"> </Column>
        <Column field="action" header="Action">
          <template #body="{ data }">
            <div class="flex items-center gap-2">
              <TrafoControl use="update" :data="data" @updated="getDataTable" />
              <Button
                icon="pi pi-calculator"
                severity="success"
                size="small"
                rounded
                aria-label="Detail"
                @click="
                  router.push({
                    name: 'trafo detail',
                    params: { id: data.id },
                  })
                "
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </CardView>

    <PaginationControl v-model="pagination" @change="getDataTable()" />
  </div>
</template>
