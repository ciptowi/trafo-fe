<script setup lang="ts">
import CardView from "../../components/app/CardView.vue";
import { BarChart, useBarChart } from "vue-chart-3";
import { computed, onMounted, ref } from "vue";
import { Chart, registerables } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { dashboardService } from "../../service/dashboard-service";

Chart.register(...registerables);

const data = ref<{ name: string; value: number }[]>([]);

const COLORS = [
  "rgba(255, 99, 132, 0.8)", // Merah
  "rgba(54, 162, 235, 0.8)", // Biru
  "rgba(255, 206, 86, 0.8)", // Kuning
  "rgba(75, 192, 192, 0.8)", // Hijau
  "rgba(153, 102, 255, 0.8)", // Ungu
  "rgba(255, 159, 64, 0.8)", // Oranye
  "rgba(199, 199, 199, 0.8)", // Abu-abu
];

const getColors = (count: number, colorsArray: string[]) => {
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    const color = colorsArray[i % colorsArray.length];
    if (color) result.push(color);
  }
  return result;
};

const chartData = computed<ChartData<"bar">>(() => ({
  labels: data.value.map((d) => d.name),
  datasets: [
    {
      data: data.value.map((d) => d.value),
      label: "Trafo Total",
      backgroundColor: getColors(data.value.length, COLORS),
    },
  ],
}));

const options = computed<ChartOptions<"bar">>(() => ({
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Summary of trafos per group",
    },
  },
}));

const { barChartProps } = useBarChart({ chartData, options });

onMounted(() => {
  dashboardService.trafoTotal().then((res) => {
    data.value = res;
  });
});
</script>

<template>
  <CardView>
    <div v-if="!data.length" class="flex items-center justify-center h-42">
      <div class="text-center">
        <i class="pi pi-database text-gray-500"></i>
        <div class="text-gray-500">No Data</div>
      </div>
    </div>
    <BarChart v-else v-bind="barChartProps" />
  </CardView>
</template>
