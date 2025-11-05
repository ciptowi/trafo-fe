<script setup lang="ts">
import { Button, Card, Toolbar, DataTable, Column } from "primevue";
import Header from "../components/Header.vue";
import CreateTrafo from "../components/trafo/CreateTrafo.vue";
import UpdateTrafo from "../components/trafo/UpdateTrafo.vue";

const products = [
  { code: "f23", name: "Trafo 1", capacity: "150", phase: "Tiga Phase" },
  { code: "f24", name: "Trafo 2", capacity: "150", phase: "Tiga Phase" },
  { code: "f25", name: "Trafo 3", capacity: "150", phase: "Tiga Phase" },
  { code: "f26", name: "Trafo 4", capacity: "150", phase: "Tiga Phase" },
];
</script>

<template>
  <Header title="System Management Gardu Distribusi PT PLN (Persero)" />

  <Toolbar class="rounded-2xl! my-4 mx-4">
    <template #start>
      <div class="flex items-center gap-2"></div>
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <CreateTrafo />
      </div>
    </template>
  </Toolbar>

  <Card class="mx-4 border border-gray-200">
    <template #content>
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column field="" header="No">
          <template #body="{ index }"> {{ index + 1 }} </template>
        </Column>
        <Column field="name" header="Trafo Name"></Column>
        <Column field="capacity" header="Capacity"></Column>
        <Column field="phase" header="Phase"></Column>
        <Column field="action" header="Action">
          <template #body>
            <div class="flex items-center gap-2">
              <UpdateTrafo />
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
