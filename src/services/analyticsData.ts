import { MonthlySpending, ServiceSavings } from "../types";

export const MONTHLY_SPENDING_DATA: MonthlySpending[] = [
  { label: "Jan", value: 56 },
  { label: "Feb", value: 63 },
  { label: "Mar", value: 47 },
  { label: "Apr", value: 72 },
  { label: "May", value: 66 },
  { label: "Jun", value: 83, peak: true },
  { label: "Jul", value: 58 },
  { label: "Aug", value: 69 },
  { label: "Sep", value: 92, peak: true },
  { label: "Oct", value: 73 },
  { label: "Nov", value: 61 },
  { label: "Dec", value: 78 },
];

export const SAVINGS_SERVICES: ServiceSavings[] = [
  { name: "Netflix", monthly: 200 },
  { name: "SportLife", monthly: 800 },
  { name: "Spotify", monthly: 150 },
  { name: "Patreon", monthly: 150 },
  { name: "iCloud", monthly: 50 },
];
