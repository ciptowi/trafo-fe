<script setup lang="ts">
import Header from "../components/Header.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import TrafoDataCalculate from "../components/trafo/TrafoDataCalculate.vue";
import TrafoInformation from "../components/trafo/TrafoInformation.vue";
import { useRoute } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { trafoService } from "../service/trafo-service";

const reoute = useRoute();

const title = ref("System Management Gardu Distribusi PT PLN (Persero)");
const trafoId = ref(0);
const trafoCapacity = ref(0);
const trafoInfo = reactive<Record<string, string>>({
  Name: "",
  Phasa: "",
  Brand: "",
  Type: "",
  Capacity: "",
  PIC: "",
});

const trafoReadings = ref([
  { colspan: 4, vLabel: "DATA" },
  { vLabel: "Vr", vValue: 219.8, iLabel: "Ir", iValue: 98.7 },
  { vLabel: "Vs", vValue: 218.2, iLabel: "Is", iValue: 90.8 },
  { vLabel: "Vt", vValue: 220.2, iLabel: "It", iValue: 87.6 },
  { colspan: 3, vLabel: "Cosphi", iValue: 0.89 },
]);

const trafoCalculation = ref([
  { label: "Phasa R", kva: 21.694, kw: 19.308, kvar: 9.892 },
  { label: "Phasa S", kva: 19.813, kw: 17.633, kvar: 9.034 },
  { label: "Phasa T", kva: 19.29, kw: 17.168, kvar: 8.795 },
]);

const trafoDataInfo = computed(() =>
  Object.keys(trafoInfo).map((key) => ({
    label: key,
    value: trafoInfo[key] || "",
  }))
);

function getTrafoDetail() {
  const id = reoute.params.id?.toString();
  trafoId.value = Number(id);
  if (!id) return;
  trafoService.findOne(trafoId.value).then((res) => {
    title.value = `System Management Gardu Distribusi PT PLN (Persero) - ${res.group.name}`;
    trafoInfo.Name = res.name;
    trafoInfo.Phasa = res.phasa;
    trafoInfo.Brand = res.brand;
    trafoInfo.Type = res.type;
    trafoInfo.Capacity = res.kapasitas + " KVA";
    trafoInfo.PIC = "Petugas 1";
    trafoCapacity.value = res.kapasitas;
  });
}

onMounted(() => {
  getTrafoDetail();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header :title="title" />
    <NavigationMenu />

    <div class="m-4">
      <div
        class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
      >
        <div
          class="w-full lg:w-1/4 flex flex-row lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4"
        >
          <TrafoInformation
            title="HISTORY"
            :data="[{ label: '2025-07-03 09:59:45', value: '' }]"
            body-class="h-45"
          >
            <template #value>
              <Button
                icon="pi pi-angle-right"
                class="bg-green-300! text-white! hover:bg-green-400! border-0!"
                size="small"
              />
            </template>
          </TrafoInformation>

          <TrafoInformation title="INFORMATION TRAFOS" :data="trafoDataInfo" />
        </div>

        <div
          class="w-full lg:w-3/4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
        >
          <TrafoDataCalculate
            title="LATEST"
            suffix-title="2025-07-03 09:59:45"
            :data="trafoReadings"
            :calculate="trafoCalculation"
            :capacity="trafoCapacity"
          />

          <TrafoDataCalculate
            title="ESTIMATE"
            is-color
            :data="trafoReadings"
            :calculate="trafoCalculation"
            :capacity="trafoCapacity"
          />
        </div>
      </div>
    </div>
  </div>
</template>
