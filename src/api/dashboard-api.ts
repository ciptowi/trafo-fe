import { client } from "../config/client";
import type { BaseResponse } from "../types/global-type";

type Res<T> = Promise<BaseResponse<T>>;
export type TrafoTotalRes = {
  id: number;
  name: string;
  total_trafo: number;
};
export type TrafoDetailRes = {
  id: number;
  name: string;
  kapasitas: number;
  group: {
    name: string;
    kodegrup: string;
    id: number;
  };
};
export type ForecaseVsActual = {
  name: string;
  forecast: { datetime: number; value: number }[];
  calculated: { datetime: number; value: number }[];
};

class DashboardApi {
  async trafoTotal() {
    return await client.get<Res<TrafoTotalRes[]>>("/dashboard/total-trafo");
  }

  async trafoList() {
    return await client.get<Res<TrafoDetailRes[]>>("/dashboard/trafo-all");
  }

  async forecastVsActual(id: number) {
    return await client.get<Res<ForecaseVsActual>>(
      `/dashboard/forecast-vs-actual/${id}`
    );
  }
}

export const dashboardApi = new DashboardApi();
