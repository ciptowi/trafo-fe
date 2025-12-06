<script setup lang="ts">
import CardView from "../../components/app/CardView.vue";
import { LineChart, useLineChart } from "vue-chart-3";
import { computed } from "vue";
import { Chart, registerables } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import type { ChartTrend } from "../../types/dashboard-type";

type CustomData = { x: number; y: number };

Chart.register(...registerables);

const props = defineProps<{ dataChart: ChartTrend }>();

const chartData = computed<ChartData<"line", CustomData[]>>(() => ({
  labels: [],
  datasets: [
    {
      data: props.dataChart.actual,
      label: "Actual",
      backgroundColor: "#77CEFF",
    },
    {
      data: props.dataChart.predicted,
      label: "Predicted",
      backgroundColor: "#97B0C4",
    },
  ],
}));

const options = computed<ChartOptions<"line">>(() => ({
  scales: {
    x: {
      type: "category",
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: props.dataChart.title || "Forecast vs Actual",
    },
  },
}));

const { lineChartProps } = useLineChart({ chartData, options });
</script>

<template>
  <CardView class="mx-4">
    <div
      v-if="!dataChart.actual.length"
      class="flex items-center justify-center h-42"
    >
      <div class="text-center">
        <i class="pi pi-database text-gray-500"></i>
        <div class="text-gray-500">No Data</div>
      </div>
    </div>
    <LineChart v-else v-bind="lineChartProps" />
  </CardView>
</template>
