import { dashboardApi } from "../api/dashboard-api";
import type {
  TrafoTotalRes,
  TrafoDetailRes,
  ForecaseVsActual,
} from "../api/dashboard-api";
import type { ChartTrend, TrafoRows } from "../types/dashboard-type";

class Mapper {
  toBarChart(data: TrafoTotalRes[]): { name: string; value: number }[] {
    return data.map((d) => ({
      name: d.name,
      value: d.total_trafo,
    }));
  }

  toTrafoList(data: TrafoDetailRes[]): TrafoRows[] {
    return data.map((d) => ({
      id: d.id,
      name: d.name,
      group: d.group.name,
      capacity: d.kapasitas + " KVA",
    }));
  }

  toTrendChart(model: ChartTrend, data: ForecaseVsActual) {
    model.title = "Forecast vs Actual: " + data.name;
    model.actual = data.forecast.map((d) => ({ x: d.datetime, y: d.value }));
    model.predicted = data.calculated.map((d) => ({
      x: d.datetime,
      y: d.value,
    }));
  }
}

class DashboardService {
  private mapper = new Mapper();

  async trafoTotal() {
    const result = await dashboardApi.trafoTotal();
    return this.mapper.toBarChart(result.data);
  }

  async trafoList() {
    const result = await dashboardApi.trafoList();
    return this.mapper.toTrafoList(result.data);
  }

  async forecastVsActual(id: number, model: ChartTrend) {
    const result = await dashboardApi.forecastVsActual(id);
    this.mapper.toTrendChart(model, result.data);
  }
}

export const dashboardService = new DashboardService();
