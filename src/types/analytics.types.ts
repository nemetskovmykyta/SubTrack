export interface MonthlySpending {
  label: string;
  value: number;
  peak?: boolean;
}

export interface ServiceSavings {
  name: string;
  monthly: number;
}

export interface MetricSummary {
  title: string;
  subtitle?: string;
  amount: number;
  currency: string;
  changeNote?: string;
  changePositive?: boolean;
  tag?: string;
}
