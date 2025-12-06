export type TrafoRows = {
  id: number;
  name: string;
  group: string;
  capacity: string;
};

export type ChartTrend = {
  title: string;
  actual: { x: number; y: number }[];
  predicted: { x: number; y: number }[];
};
