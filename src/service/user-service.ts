import { userApi } from "../api/user-api";
import type { Combobox } from "../types/global-type";

type PaginationArg = { page: number; first: number; totalRecords: number };
export type ModelArg = {
  id: number;
  username: string;
  group: Combobox | null;
  oldPassword: string;
  password: string;
};

class UserService {
  async create(model: ModelArg) {
    const param = {
      username: model.username,
      password: model.password,
      group_id: model.group?.id || null,
    };
    const result = await userApi.craete(param);
    return result;
  }

  async findOne(id: number) {
    const result = await userApi.findOne(id);
    return result;
  }

  async findAll(q: string | null, param: PaginationArg) {
    const query = { q, page: param.page, size: 10 };
    const result = await userApi.findAll(query);
    param.totalRecords = result.pagination.totalRecords;
    return result;
  }

  async updateUsername(model: ModelArg) {
    const param = {
      username: model.username,
      group_id: model.group?.id || null,
    };
    const result = await userApi.updateUsername(model.id, param);
    return result;
  }

  async updatePassword(model: ModelArg) {
    const param = { oldPassword: model.oldPassword, password: model.password };
    const result = await userApi.updatePassword(model.id, param);
    return result;
  }

  async delete(id: number) {
    const result = await userApi.delete(id);
    return result;
  }
}

export const userService = new UserService();
