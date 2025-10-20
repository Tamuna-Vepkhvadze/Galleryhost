

export interface StatType {
  title: string;
  value: number;
  suffix?: string;
}

export const stats: StatType[] = [
  { title: "Images Shared", value: 35000, suffix: "+" },
  { title: "Photographers", value: 12000, suffix: "+" },
  { title: "Collections", value: 250, suffix: "+" },
  { title: "Satisfaction", value: 96, suffix: "%" },
];
