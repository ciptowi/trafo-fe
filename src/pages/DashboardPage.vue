<script setup lang="ts">
import { reactive } from "vue";
import type { ChartTrend } from "../types/dashboard-type";
import Header from "../components/Header.vue";
import NavigationMenu from "../components/NavigationMenu.vue";
import ChartTrafoPerGroup from "../components/dashboard/ChartTrafoPerGroup.vue";
import TableAllTrafos from "../components/dashboard/TableAllTrafos.vue";
import ChartForecastVsActual from "../components/dashboard/ChartForecastVsActual.vue";
import { dashboardService } from "../service/dashboard-service";

const dataChart = reactive<ChartTrend>({
  title: "",
  actual: [],
  predicted: [],
});

function getChartTrend(id: number) {
  dashboardService.forecastVsActual(id, dataChart);
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Header title="System Management Gardu Distribusi PT PLN (Persero)" />
    <NavigationMenu />

    <div class="grid grid-cols-2 gap-4 p-4">
      <ChartTrafoPerGroup />
      <TableAllTrafos @detail="getChartTrend" />
    </div>

    <ChartForecastVsActual :data-chart="dataChart" />
  </div>
</template>
