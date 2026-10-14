export type CalendarCategory = "Entertainment" | "Work" | "Sport" | "Utilities";

export type CalendarView = "Month" | "Week" | "List";

export interface CalendarPayment {
  day: number;
  name: string;
  amount: number;
  category: CalendarCategory;
  logo: string;
  tone: string;
  urgent?: boolean;
}

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  dateKey: string;
}
