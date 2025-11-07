import type { TrafoGroupModel } from "../types/trafo-group-type";
import { trafoGroupApi, type MainTrafoGroupReq } from "../api/trafo-group-api";

class TrafoGroupService {
  async save(data: TrafoGroupModel) {
    try {
      const result = await trafoGroupApi.save({
        name: data.name,
        kodegrup: data.code,
      });
      return result;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async findAll(param: MainTrafoGroupReq) {
    try {
      const result = await trafoGroupApi.findAll(param);
      return result.data;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await trafoGroupApi.findOne(id);
      return result.data;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async update(id: number, data: TrafoGroupModel) {
    try {
      const result = await trafoGroupApi.update(id, {
        name: data.name,
        kodegrup: data.code,
      });
      return result;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async delete(id: number) {
    try {
      const result = await trafoGroupApi.delete(id);
      return result;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async combobox() {
    try {
      const result = await trafoGroupApi.combobox();
      return result.data;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }
}

export const trafoGroupService = new TrafoGroupService();
