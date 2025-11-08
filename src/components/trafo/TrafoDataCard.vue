<script setup lang="ts">
import { ref, defineProps } from "vue";

defineProps<{
  title: string;
  date?: string;
}>();

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
</script>

<template>
  <div class="w-full bg-white rounded-lg shadow-lg p-4">
    <div class="flex justify-between items-center mb-4 border-b pb-2">
      <h3 class="text-sm font-semibold text-gray-700 uppercase">{{ title }}</h3>
      <span v-if="date" class="text-xs text-gray-500">{{ date }}</span>
    </div>

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
      <div class="text-xs font-semibold text-gray-600 mb-2">CALCULATE</div>
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
  </div>
</template>
