import type { TrafoGroupModel } from "../types/trafo-group-type";
import { trafoGroupApi, type MainTrafoGroupReq } from "../api/trafo-group-api";

class TrafoGroupService {
  async save(data: TrafoGroupModel) {
    const result = await trafoGroupApi.save({
      name: data.name,
      kodegrup: data.code,
    });
    return result;
  }

  async findAll(param: MainTrafoGroupReq) {
    const result = await trafoGroupApi.findAll(param);
    return {
      data: result.data,
      total: result.pagination.totalRecords,
    };
  }

  async findOne(id: number) {
    const result = await trafoGroupApi.findOne(id);
    return result.data;
  }

  async update(id: number, data: TrafoGroupModel) {
    const result = await trafoGroupApi.update(id, {
      name: data.name,
      kodegrup: data.code,
    });
    return result;
  }

  async delete(id: number) {
    const result = await trafoGroupApi.delete(id);
    return result;
  }

  async combobox() {
    const result = await trafoGroupApi.combobox();
    return result.data;
  }
}

export const trafoGroupService = new TrafoGroupService();
