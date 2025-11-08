<script setup lang="ts">
import Header from "../components/Header.vue";
import CardView from "../components/app/CardView.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { trafoService } from "../service/trafo-service";

const reoute = useRoute();

const owner = reactive({
  id: 0,
  name: "",
});
const trafoInfo = reactive({
  Name: "WD15",
  Phasa: "R",
  Brand: "Y",
  Type: "Y",
  Capacity: "100 KVA",
  PIC: "Petugas 4",
});

const dataReadings = ref([
  { key: "Vr", value: "219.8 V" },
  { key: "Vs", value: "218.2 V" },
  { key: "Vt", value: "220.2 V" },
  { key: "Is", value: "98.7 A" },
  { key: "It", value: "90.8 A" },
  { key: "It", value: "87.6 A" },
  { key: "Cosphy", value: "0.89" },
]);

const calculationData = ref([
  { name: "Phasa R", KVA: "21.694", KW: "19.308", KVAr: "9.892" },
  { name: "Phasa S", KVA: "19.813", KW: "17.633", KVAr: "9.034" },
  { name: "Phasa T", KVA: "19.29", KW: "17.168", KVAr: "8.795" },
]);

const total = ref({
  KVA: "60.796",
  KW: "54.109",
  KVAr: "27.721",
});

const cosPhi = "Cosphy 0.89";

function getTrafoDetail() {
  const id = reoute.params.id?.toString();
  owner.id = Number(id);
  if (!id) return;
  trafoService.findOne(owner.id).then((res) => {
    owner.name = res.group.name;
    trafoInfo.Name = res.name;
    trafoInfo.Phasa = res.phasa;
    trafoInfo.Brand = res.brand;
    trafoInfo.Type = res.type;
    trafoInfo.Capacity = res.kapasitas + " KVA";
    trafoInfo.PIC = res.group.name;
  });
}

onMounted(() => {
  getTrafoDetail();
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header
      :title="`System Management Gardu Distribusi PT PLN (Persero) - ${owner.name}`"
    />
    <NavigationMenu />

    <div class="m-4">
      <div
        class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8"
      >
        <div class="w-full lg:w-1/4">
          <CardView title="HISTORY" class="mb-4">
            <div class="h-30">
              <div class="font-medium text-gray-500 text-xs">
                2025-07-03 09:59:45
              </div>
            </div>
          </CardView>
          <CardView title="INFORMATION TRAFOS">
            <div
              v-for="(value, key) in trafoInfo"
              :key="key"
              class="flex justify-between text-xs py-1"
            >
              <span class="font-medium text-gray-500">{{ key }}</span>
              <span class="font-semibold text-gray-800">{{ value }}</span>
            </div>
          </CardView>
        </div>

        <div
          class="w-full lg:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          <CardView
            title="LATEST"
            suffix-title="2025-07-03 09:59:45"
            class="w-full"
          >
            <div class="mb-4">
              <div class="text-xs font-semibold text-gray-600 mb-2">DATA</div>
              <div
                class="flex justify-between text-sm py-1 border-b border-gray-100"
                v-for="({ key, value }, index) in dataReadings"
                :key="index"
              >
                <span class="w-1/3">{{ key }}</span>
                <span class="w-2/3 text-right font-medium">{{ value }}</span>
              </div>
              <div class="flex justify-end text-sm py-1 mt-2">
                <span class="font-semibold">{{ cosPhi }}</span>
              </div>
            </div>

            <div>
              <div class="text-xs font-semibold text-gray-600 mb-2">
                CALCULATE
              </div>
              <div
                class="text-xs grid grid-cols-4 gap-2 font-medium text-gray-500 mb-1"
              >
                <span></span>
                <span class="text-center">KVA</span>
                <span class="text-center">KW</span>
                <span class="text-center">KVAr</span>
              </div>

              <div
                v-for="(phase, index) in calculationData"
                :key="index"
                class="text-sm grid grid-cols-4 gap-2 py-1 bg-gray-50 rounded-sm mb-1"
              >
                <span class="font-medium text-gray-700">{{ phase.name }}</span>
                <span class="text-center">{{ phase.KVA }}</span>
                <span class="text-center">{{ phase.KW }}</span>
                <span class="text-center">{{ phase.KVAr }}</span>
              </div>

              <div
                class="text-sm grid grid-cols-4 gap-2 py-1 mt-2 font-bold border-t pt-2"
              >
                <span>Total</span>
                <span class="text-center">{{ total.KVA }}</span>
                <span class="text-center">{{ total.KW }}</span>
                <span class="text-center">{{ total.KVAr }}</span>
              </div>
            </div>

            <div class="mt-4 border-t pt-4">
              <div class="flex justify-between text-sm font-medium">
                <span>Sisa Kapasitas Trafo</span>
                <span
                  :class="{
                    'text-green-600 font-bold': true,
                    'bg-green-100 p-1 rounded': true,
                  }"
                >
                  39.204 KVA (39.2%)
                </span>
              </div>
            </div>
          </CardView>

          <CardView title="ESTIMATE" class="w-full">
            <div class="mb-4">
              <div class="text-xs font-semibold text-gray-600 mb-2">DATA</div>
              <div
                class="flex justify-between text-sm py-1 border-b border-gray-100"
                v-for="({ key, value }, index) in dataReadings"
                :key="index"
              >
                <span class="w-1/3">{{ key }}</span>
                <span class="w-2/3 text-right font-medium">{{ value }}</span>
              </div>
              <div class="flex justify-end text-sm py-1 mt-2">
                <span class="font-semibold">{{ cosPhi }}</span>
              </div>
            </div>

            <div>
              <div class="text-xs font-semibold text-gray-600 mb-2">
                CALCULATE
              </div>
              <div
                class="text-xs grid grid-cols-4 gap-2 font-medium text-gray-500 mb-1"
              >
                <span></span>
                <span class="text-center">KVA</span>
                <span class="text-center">KW</span>
                <span class="text-center">KVAr</span>
              </div>

              <div
                v-for="(phase, index) in calculationData"
                :key="index"
                class="text-sm grid grid-cols-4 gap-2 py-1 bg-gray-50 rounded-sm mb-1"
              >
                <span class="font-medium text-gray-700">{{ phase.name }}</span>
                <span class="text-center">{{ phase.KVA }}</span>
                <span class="text-center">{{ phase.KW }}</span>
                <span class="text-center">{{ phase.KVAr }}</span>
              </div>

              <div
                class="text-sm grid grid-cols-4 gap-2 py-1 mt-2 font-bold border-t pt-2"
              >
                <span>Total</span>
                <span class="text-center">{{ total.KVA }}</span>
                <span class="text-center">{{ total.KW }}</span>
                <span class="text-center">{{ total.KVAr }}</span>
              </div>
            </div>

            <div class="mt-4 border-t pt-4">
              <div class="flex justify-between text-sm font-medium">
                <span>Sisa Kapasitas Trafo</span>
                <span
                  :class="{
                    'text-green-600 font-bold': true,
                    'bg-green-100 p-1 rounded': true,
                  }"
                >
                  39.204 KVA (39.2%)
                </span>
              </div>
            </div>
          </CardView>
        </div>
      </div>
    </div>
  </div>
</template>
