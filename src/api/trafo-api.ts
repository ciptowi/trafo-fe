import { client } from "../config/client";
import type {
  BaseResponse,
  BaseResponsePagination,
} from "../types/global-type";

export type SaveTrafoReq = {
  name: string;
  type: string;
  brand: string;
  kapasitas: number | null;
  voltase: number | null;
  current: number | null;
  phasa: string;
  longitude: number | null;
  latitude: number | null;
  group_id: number | null;
};
export type MainTrafoReq = { q: string | null; page: number; size: number };

type Res<T> = Promise<BaseResponse<T>>;
type ResPage<T> = Promise<BaseResponsePagination<T>>;
export type RowTrafoRes = {
  name: string;
  type: string;
  brand: string;
  kapasitas: number;
  voltase: number;
  current: number;
  phasa: string;
  longitude: number;
  latitude: number;
  id: number;
  group_id: number;
};

class TrafoApi {
  async save(data: SaveTrafoReq) {
    return await client.post<Res<string>>("/trafo/save", data);
  }

  async findAll(param: MainTrafoReq) {
    return await client.get<ResPage<RowTrafoRes[]>>("/trafo/find-all", {
      params: param,
    });
  }

  async findOne(id: number) {
    return await client.get<Res<RowTrafoRes>>(`/trafo/find-one/${id}`);
  }

  async update(id: number, data: SaveTrafoReq) {
    return await client.post<Res<string>>(`/trafo/update/${id}`, data);
  }
}

export const trafoApi = new TrafoApi();
