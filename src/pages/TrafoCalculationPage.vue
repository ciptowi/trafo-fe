<script setup lang="ts">
import Header from "../components/Header.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import TrafoDataCalculate from "../components/trafo/TrafoDataCalculate.vue";
import TrafoInformation from "../components/trafo/TrafoInformation.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { trafoService } from "../service/trafo-service";
import { calculationService } from "../service/calculation-service";
import type {
  CalculateRow,
  InformationRow,
  ReadingRow,
  RestCapacity,
} from "../types/calculation-type";
import TrafoCustomer from "../components/trafo/TrafoCustomer.vue";
import { overlayState } from "../components/app/overlay-state";

const reoute = useRoute();

const title = ref("System Management Gardu Distribusi PT PLN (Persero)");
const trafoId = ref(0);
const trafoCapacity = ref(0);

const rest = reactive<RestCapacity>({
  capacity: "",
  percent: "",
});
const forcast = reactive<{ date?: string; value?: string }>({});

const trafoHistory = ref<InformationRow[]>([]);

const trafoInfo = ref<InformationRow[]>([
  { label: "Name", value: "-" },
  { label: "Phasa", value: "-" },
  { label: "Brand", value: "-" },
  { label: "Type", value: "-" },
  { label: "Capacity", value: "-" },
  { label: "PIC", value: "-" },
]);

const trafoReadings = ref<ReadingRow[]>([
  { colspan: 4, vLabel: "DATA" },
  { vLabel: "Vr", vValue: "-", iLabel: "Ir", iValue: "-" },
  { vLabel: "Vs", vValue: "-", iLabel: "Is", iValue: "-" },
  { vLabel: "Vt", vValue: "-", iLabel: "It", iValue: "-" },
  { colspan: 3, vLabel: "Cosphi", iValue: "-" },
]);

const trafoCalculation = ref<CalculateRow[]>([
  { label: "Phasa R", kva: "-", kw: "-", kvar: "-" },
  { label: "Phasa S", kva: "-", kw: "-", kvar: "-" },
  { label: "Phasa T", kva: "-", kw: "-", kvar: "-" },
  { label: "TOTAL", kva: "-", kw: "-", kvar: "-" },
]);

function getTrafoDetail() {
  const id = reoute.params.id?.toString();
  trafoId.value = Number(id);
  if (!id) return;
  calculationService
    .result({
      id: trafoId.value,
      capacity: trafoCapacity,
      title: title,
      info: trafoInfo,
      history: trafoHistory,
      rest: rest,
      data: trafoReadings,
      calculate: trafoCalculation,
    })
    .catch(() => {
      trafoService.setInfoDetail({
        id: trafoId.value,
        capacity: trafoCapacity,
        title: title,
        info: trafoInfo,
      });
    });
}

async function runForecast() {
  overlayState.show();
  const rersponse = await calculationService.forecast(trafoId.value);
  forcast.date = rersponse.data.date;
  forcast.value = rersponse.data.value.toFixed(3);

  overlayState.hide();
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
            :data="trafoHistory"
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

          <TrafoInformation title="INFORMATION TRAFOS" :data="trafoInfo" />
        </div>

        <div
          class="w-full lg:w-3/4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4"
        >
          <TrafoDataCalculate
            title="LATEST"
            suffix-title="2025-07-03 09:59:45"
            :data="trafoReadings"
            :calculate="trafoCalculation"
            :rest="rest"
          />

          <TrafoDataCalculate
            title="ESTIMATE"
            is-color
            :data="trafoReadings"
            :calculate="trafoCalculation"
            :forecast-date="forcast.date"
            :forecast-value="forcast.value"
            :rest="rest"
          />
        </div>
      </div>
    </div>

    <TrafoCustomer
      :id="trafoId"
      :capacity="trafoCapacity"
      @forecast="runForecast"
    />
  </div>
</template>
