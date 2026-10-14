import { CalendarDay } from "../types";

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Generates calendar grid cells (typically 35 cells) for the given year and month.
 */
export function generateCalendarDays(year: number, month: number): CalendarDay[] {
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const now = new Date();

  return Array.from({ length: 35 }, (_, index) => {
    const date = new Date(year, month, index - mondayOffset + 1);
    const dayYear = date.getFullYear();
    const dayMonth = date.getMonth();
    const dayNumber = date.getDate();

    const isCurrentMonth = dayMonth === month;
    const isToday =
      dayNumber === now.getDate() && dayMonth === now.getMonth() && dayYear === now.getFullYear();

    return {
      day: dayNumber,
      month: dayMonth,
      year: dayYear,
      isCurrentMonth,
      isToday,
      dateKey: `${dayYear}-${String(dayMonth + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`,
    };
  });
}
