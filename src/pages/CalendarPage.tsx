import { useMemo, useState } from "react";
import { DashboardNav } from "../components/layout";
import { Icon } from "../components/icons";
import { CalendarCategory, CalendarView } from "../types";
import { CalendarGrid, CalendarSidebar } from "../features/calendar";
import { CALENDAR_CATEGORIES, INITIAL_CALENDAR_PAYMENTS } from "../services";
import styles from "./CalendarPage.module.css";

const MONTH_NAMES = [
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

export default function CalendarPage() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [view, setView] = useState<CalendarView>("Month");
  const [selectedCategories, setSelectedCategories] =
    useState<CalendarCategory[]>(CALENDAR_CATEGORIES);

  const displayDate = new Date(2026, 9 + monthOffset, 1);
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();
  const monthName = MONTH_NAMES[month];
  const isOctober = month === 9 && year === 2026;

  const days = useMemo(() => {
    const mondayOffset = (new Date(year, month, 1).getDay() + 6) % 7;
    return Array.from({ length: 35 }, (_, index) => {
      const date = new Date(year, month, index - mondayOffset + 1);
      return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
        currentMonth: date.getMonth() === month,
      };
    });
  }, [month, year]);

  const toggleCategory = (category: CalendarCategory) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  return (
    <main className={styles.calendarShell}>
      <DashboardNav active="calendar" />

      <div className={styles.calendarContent}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>PAYMENTS & SCHEDULE</span>
            <h1>Payment Calendar</h1>
            <p>Plan ahead and keep every recurring payment in view.</p>
          </div>
          <div className={styles.metaChip}>
            <span className={styles.metaIcon}>
              <Icon name="calendar" />
            </span>
            <div className={styles.metaText}>
              <strong>{monthName} overview</strong>
              <small>5 scheduled payments</small>
            </div>
          </div>
        </div>

        <div className={styles.calendarLayout}>
          <CalendarGrid
            days={days}
            payments={INITIAL_CALENDAR_PAYMENTS}
            view={view}
            onViewChange={setView}
            monthName={monthName}
            year={year}
            onPrevMonth={() => setMonthOffset((v) => v - 1)}
            onNextMonth={() => setMonthOffset((v) => v + 1)}
            selectedCategories={selectedCategories}
            isCurrentDisplayMonth={isOctober}
          />

          <CalendarSidebar
            categories={CALENDAR_CATEGORIES}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />
        </div>
      </div>
    </main>
  );
}
