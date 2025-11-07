import type { SaveTrafoReq } from "../api/trafo-api";
import type { TrafoModel } from "../types/trafo-type";

class TrafoMapper {
  setPayloadSave(data: TrafoModel): SaveTrafoReq {
    return {
      name: data.name,
      type: data.type,
      brand: data.brand,
      kapasitas: data.capacity,
      voltase: Number(data.voltage.split(":")[0]),
      current: Number(data.current.split(":")[0]),
      phasa: data.phase,
      longitude: data.longitude,
      latitude: data.latitude,
      group_id: data.group_id,
    };
  }
}

export const trafoMapper = new TrafoMapper();
