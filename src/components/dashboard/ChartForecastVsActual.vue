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
      borderColor: "#77CEFF",
    },
    {
      data: props.dataChart.predicted,
      label: "Predicted",
      backgroundColor: "#68f67b",
      borderColor: "#68f67b",
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
    tooltip: {
      callbacks: {
        label: function (context) {
          let label = context.dataset.label || "";
          if (label) {
            label += ": ";
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toFixed(2) + " VA";
          }
          return label;
        },
      },
    },
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
      v-if="dataChart.isLoading"
      class="flex items-center justify-center h-80 w-full"
    >
      <svg
        class="w-12 h-12 animate-spin text-blue-600"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          stroke-opacity="0.25"
          stroke-width="5"
        ></circle>
        <path
          d="M45 25a20 20 0 0 1-20 20"
          stroke="currentColor"
          stroke-width="5"
          stroke-linecap="round"
        ></path>
      </svg>
    </div>

    <div v-else>
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
    </div>
  </CardView>
</template>

<style scoped>
.tets {
  background-color: #68f67b;
}
</style>
