export type InformationRow = { label: string; value: string };

export type ReadingRow = {
  vLabel?: string;
  vValue?: string;
  iLabel?: string;
  iValue?: string;
  colspan?: number;
};

export type CalculateRow = {
  label: string;
  kva: string;
  kw: string;
  kvar: string;
};

export type RestCapacity = {
  capacity: string;
  percent: string;
};
