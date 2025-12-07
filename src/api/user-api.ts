import { client } from "../config/client";
import type {
  BaseResponse,
  BaseResponsePagination,
} from "../types/global-type";

type CreateReq = { username: string; password: string };
type UpdateUsernameReq = { username: string };
type UpdatePassworReq = { oldPassword: string; password: string };
type PaginationReq = { q: string | null; page: number; size: number };

type Res<T> = Promise<BaseResponse<T>>;
type ResPage<T> = Promise<BaseResponsePagination<T>>;

class UserApi {
  async craete(data: CreateReq) {
    return await client.post<Res<string>>("/management-user/create", data);
  }

  async updateUsername(id: number, data: UpdateUsernameReq) {
    return await client.post<Res<string>>(
      `/management-user/update/${id}`,
      data
    );
  }

  async updatePassword(id: number, data: UpdatePassworReq) {
    return await client.post<Res<string>>(
      `/management-user/update-password/${id}`,
      data
    );
  }

  async delete(id: number) {
    return await client.post<Res<string>>(`/management-user/delete/${id}`);
  }

  async findOne(id: number) {
    return await client.get<Res<any>>(`/management-user/get/${id}`);
  }

  async findAll(param: PaginationReq) {
    return await client.get<ResPage<any[]>>("/management-user/get-all", {
      params: param,
    });
  }
}

export const userApi = new UserApi();
