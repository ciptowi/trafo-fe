<script setup lang="ts">
import Header from "../components/Header.vue";
import TrafoControl from "../components/trafo/TrafoControl.vue";
import SelectField from "../components/field/SelectField.vue";
import type { RowTrafoRes } from "../api/trafo-api";
import type { Combobox } from "../types/global-type";
import { Button, Card, DataTable, Column } from "primevue";
import { onMounted, ref } from "vue";
import { trafoService } from "../service/trafo-service";
import { trafoGroupService } from "../service/trafo-group-service";

const products = ref<RowTrafoRes[]>([]);
const group = ref<Combobox | null>(null);

async function getDataTable() {
  try {
    const result = await trafoService.findAll({
      q: null,
      page: 0,
      size: 10,
    });
    products.value = result;
  } catch (error) {}
}

onMounted(() => {
  trafoGroupService.combobox();
  getDataTable();
});
</script>

<template>
  <Header title="System Management Gardu Distribusi PT PLN (Persero)" />

  <Card class="my-4 mx-4 p-0 border border-gray-200">
    <template #content>
      <div class="flex items-center justify-between">
        <div class="w-1/3">
          <SelectField
            mounted
            v-model="group"
            use="trafo-group"
            name="group"
            label="Trafo Group"
          />
        </div>
        <TrafoControl
          v-if="group"
          use="create"
          :group="group"
          @created="getDataTable"
        />
      </div>
    </template>
  </Card>

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
                rounded
                aria-label="Detail"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </template>
  </Card>
</template>
