import { client } from "../config/client";
import type {
  BaseResponse,
  BaseResponsePagination,
} from "../types/global-type";

export type SaveTrafoGroupReq = {
  name: string;
  kodegrup: string;
};
export type MainTrafoGroupReq = {
  q: string | null;
  page: number;
  size: number;
};

type Res<T> = Promise<BaseResponse<T>>;
type ResPage<T> = Promise<BaseResponsePagination<T>>;
export type RowTrafoGroupRes = { id: number; name: string; kodegrup: string };
export type ComboboxRes = { id: number; name: string };

class TrafoGroupApi {
  async save(data: SaveTrafoGroupReq) {
    return await client.post<Res<string>>("/group-trafo/save", data);
  }

  async findAll(param: MainTrafoGroupReq) {
    return await client.get<ResPage<RowTrafoGroupRes[]>>(
      "/group-trafo/find-all",
      {
        params: param,
      }
    );
  }

  async findOne(id: number) {
    return await client.get<Res<RowTrafoGroupRes>>(
      `/group-trafo/find-one/${id}`
    );
  }

  async update(id: number, data: SaveTrafoGroupReq) {
    return await client.post<Res<string>>(`/group-trafo/update/${id}`, data);
  }

  async delete(id: number) {
    return await client.post<Res<string>>(`/group-trafo/delete/${id}`);
  }

  async combobox() {
    return await client.get<Res<ComboboxRes[]>>(`/group-trafo/combobox`);
  }
}

export const trafoGroupApi = new TrafoGroupApi();
