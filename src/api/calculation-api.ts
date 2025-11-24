import { client } from "../config/client";
import type { BaseResponse } from "../types/global-type";

type Res<T> = Promise<BaseResponse<T>>;
export type CalculationRes = {
  trafo: Trafo;
  hasil_kalkulasi: HasilKalkulasi;
};
type Trafo = {
  group_id: number;
  group: { id: number; name: string; kodegrup: string };
  name: string;
  type: string;
  brand: string;
  kapasitas: number;
  voltase: number;
  current: number;
  voltase_per: number;
  current_per: number;
  phasa: string;
  longitude: number;
  latitude: number;
  id: number;
};
type HasilKalkulasi = {
  v_r: number;
  v_s: number;
  v_t: number;
  i_r: number;
  i_s: number;
  i_t: number;
  cosphi: number;
  kv_r: number;
  kv_s: number;
  kv_t: number;
  kw_r: number;
  kw_s: number;
  kw_t: number;
  kvar_r: number;
  kvar_s: number;
  kvar_t: number;
  total_kva: number;
  total_kw: number;
  total_kvar: number;
  sisa_kap: number;
  waktu_kalkulasi: string;
  tgl_upload: string;
  id: number;
};

class CalculationApi {
  async calculationResult(id: number) {
    return await client.getNoPopup<Res<CalculationRes>>(
      `/trafo/${id}/hasil-kalkulasi`
    );
  }

  async uploadCsv(id_trafo: number, kapasitas: number, file: File) {
    const form = new FormData();
    form.append("file", file);
    return await client.postForm<Res<CalculationRes>>(
      `/kalkulasi/upload-csv`,
      form,
      {
        params: {
          id_trafo,
          kapasitas,
        },
      }
    );
  }

  async exportCsv(id: number) {
    return await client.getDownload(
      `/kalkulasi/export-csv/${id}`,
      `kalkulasi.csv`
    );
  }

  async forecast(id: number) {
    return await client.get<Res<{ date: string; value: number }>>(
      `/forecast/hitung/${id}`
    );
  }
}

export const calculationApi = new CalculationApi();
