import type { Ref } from "vue";
import { calculationApi, type CalculationRes } from "../api/calculation-api";
import type {
  CalculateRow,
  InformationRow,
  ReadingRow,
  RestCapacity,
} from "../types/calculation-type";

type CalculateArg = {
  id: number;
  capacity: Ref<number>;
  rest: RestCapacity;
  title: Ref<string>;
  info: Ref<InformationRow[]>;
  history: Ref<InformationRow[]>;
  data: Ref<ReadingRow[]>;
  calculate: Ref<CalculateRow[]>;
};

class Mapper {
  bindDataCalculation(client: CalculateArg, result: CalculationRes) {
    const cal = result.hasil_kalkulasi;
    const trafo = result.trafo;

    // sisa kapasitas
    client.capacity.value = trafo.kapasitas;
    client.rest.capacity = cal.sisa_kap.toFixed(3) + " KVA";
    client.rest.percent = (cal.sisa_kap / trafo.kapasitas*100).toFixed(2) + " %";

    // history
    client.history.value = [{ label: cal.waktu_kalkulasi, value: "" }];

    // trafo info
    client.title.value = `System Management Gardu Distribusi PT PLN (Persero) - ${trafo.group.name}`;
    client.info.value = [
      { label: "Name", value: trafo.name },
      { label: "Phasa", value: trafo.phasa },
      { label: "Brand", value: trafo.brand },
      { label: "Type", value: trafo.type },
      { label: "Capacity", value: trafo.kapasitas + " KVA" },
      { label: "PIC", value: "-" },
    ];

    // reading data
    client.data.value = [
      { colspan: 4, vLabel: "DATA" },
      {
        vLabel: "Vr",
        vValue: cal.v_r.toFixed(1) + " V",
        iLabel: "Ir",
        iValue: cal.i_r.toFixed(1) + " A",
      },
      {
        vLabel: "Vs",
        vValue: cal.v_s.toFixed(1) + " V",
        iLabel: "Is",
        iValue: cal.i_s.toFixed(1) + " A",
      },
      {
        vLabel: "Vt",
        vValue: cal.v_t.toFixed(1) + " V",
        iLabel: "It",
        iValue: cal.i_t.toFixed(1) + " A",
      },
      {
        colspan: 3,
        vLabel: "Cosphi",
        iValue: cal.cosphi.toFixed(2),
      },
    ];

    // calculate data
    client.calculate.value = [
      {
        label: "Phasa R",
        kva: cal.kv_r.toFixed(3) + " KVA",
        kw: cal.kw_r.toFixed(3) + " KW",
        kvar: cal.kvar_r.toFixed(3) + " KVAr",
      },
      {
        label: "Phasa S",
        kva: cal.kv_s.toFixed(3) + " KVA",
        kw: cal.kw_s.toFixed(3) + " KW",
        kvar: cal.kvar_s.toFixed(3) + " KVAr",
      },
      {
        label: "Phasa T",
        kva: cal.kv_t.toFixed(3) + " KVA",
        kw: cal.kw_t.toFixed(3) + " KW",
        kvar: cal.kvar_t.toFixed(3) + " KVAr",
      },
      {
        label: "TOTAL",
        kva: cal.total_kva.toFixed(3) + " KVA",
        kw: cal.total_kw.toFixed(3) + " KW",
        kvar: cal.total_kvar.toFixed(3) + " KVAr",
      },
    ];
  }
}

const mapper = new Mapper();

class CalculationService {
  async result(param: CalculateArg) {
    const result = await calculationApi.calculationResult(param.id);
    mapper.bindDataCalculation(param, result.data);
  }

  async uploadCsv(id: number, capacity: number, file: File) {
    return await calculationApi.uploadCsv(id, capacity, file);
  }

  async exportCsv(id: number) {
    return await calculationApi.exportCsv(id);
  }
}

export const calculationService = new CalculationService();
