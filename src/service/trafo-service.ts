import { trafoApi, type MainTrafoReq } from "../api/trafo-api";
import { trafoMapper } from "./trafo-mapper";
import type { TrafoModel } from "../types/trafo-type";

class TrafoService {
  async save(data: TrafoModel) {
    try {
      const result = await trafoApi.save(trafoMapper.setPayloadSave(data));
      return result;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async findAll(param: MainTrafoReq) {
    try {
      const result = await trafoApi.findAll(param);
      return result.data;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await trafoApi.findOne(id);
      return result.data;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }

  async update(data: TrafoModel) {
    try {
      const result = await trafoApi.update(
        data.id,
        trafoMapper.setPayloadSave(data)
      );
      return result;
    } catch (error) {
      const e = error as Error;
      throw new Error(e.message);
    }
  }
}

export const trafoService = new TrafoService();
