import type { Ref } from "vue";
import {
  trafoApi,
  type MainTrafoReq,
  type RowTrafoRes,
  type SaveTrafoReq,
} from "../api/trafo-api";
import type { TrafoModel } from "../types/trafo-type";

type InfoArg = {
  id: number;
  capacity: Ref<number>;
  title: Ref<string>;
  info: Ref<{ label: string; value: string }[]>;
};

class Mapper {
  setPayloadSave(data: TrafoModel): SaveTrafoReq {
    const voltages = data.voltage.split(":");
    const currents = data.current.split(":");
    return {
      name: data.name,
      type: data.type,
      brand: data.brand,
      kapasitas: data.capacity,
      voltase: Number(voltages[0]),
      voltase_per: Number(voltages[1]),
      current: Number(currents[0]),
      current_per: Number(currents[1]),
      phasa: data.phase,
      longitude: data.longitude,
      latitude: data.latitude,
      group_id: data.group_id,
    };
  }

  toInfoDetail(data: InfoArg, result: RowTrafoRes) {
    data.title.value = `System Management Gardu Distribusi PT PLN (Persero) - ${result.group.name}`;
    data.capacity.value = result.kapasitas;
    data.info.value = [
      { label: "Name", value: result.name },
      { label: "Phasa", value: result.phasa },
      { label: "Brand", value: result.brand },
      { label: "Type", value: result.type },
      { label: "Capacity", value: result.kapasitas + " KVA" },
      { label: "PIC", value: "-" },
    ];
  }
}

const mapper = new Mapper();

class TrafoService {
  async save(data: TrafoModel) {
    const result = await trafoApi.save(mapper.setPayloadSave(data));
    return result;
  }

  async findAll(param: MainTrafoReq) {
    const result = await trafoApi.findAll(param);
    return {
      data: result.data,
      total: result.pagination.totalRecords,
    };
  }

  async findOne(id: number) {
    const result = await trafoApi.findOne(id);
    return result.data;
  }

  async setInfoDetail(param: InfoArg) {
    const result = await trafoApi.findOne(param.id);
    mapper.toInfoDetail(param, result.data);
  }

  async update(data: TrafoModel) {
    const result = await trafoApi.update(data.id, mapper.setPayloadSave(data));
    return result;
  }
}

export const trafoService = new TrafoService();
