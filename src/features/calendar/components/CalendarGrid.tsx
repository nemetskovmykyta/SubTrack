import { CalendarCategory, CalendarPayment, CalendarView } from "../../../types";
import styles from "./CalendarGrid.module.css";

export interface CalendarDayItem {
  day: number;
  month: number;
  year: number;
  currentMonth: boolean;
}

export interface CalendarGridProps {
  days: CalendarDayItem[];
  payments: CalendarPayment[];
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  monthName: string;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  selectedCategories: CalendarCategory[];
  isCurrentDisplayMonth: boolean;
}

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function CalendarGrid({
  days,
  payments,
  view,
  onViewChange,
  monthName,
  year,
  onPrevMonth,
  onNextMonth,
  selectedCategories,
  isCurrentDisplayMonth,
}: CalendarGridProps) {
  const filteredPayments = payments.filter((payment) =>
    selectedCategories.includes(payment.category)
  );

  const shownDays = view === "Week" ? days.slice(0, 7) : days;

  return (
    <section
      className={styles.calendarCard}
      aria-label="Payment calendar"
      data-testid="calendar-card"
    >
      <div className={styles.calendarToolbar}>
        <div className={styles.monthSwitcher}>
          <button
            type="button"
            aria-label="Previous month"
            onClick={onPrevMonth}
            data-testid="prev-month-btn"
          >
            ‹
          </button>
          <strong>
            {monthName} {year}
          </strong>
          <button
            type="button"
            aria-label="Next month"
            onClick={onNextMonth}
            data-testid="next-month-btn"
          >
            ›
          </button>
        </div>
        <div className={styles.viewToggle} aria-label="Calendar view">
          {(["Month", "Week", "List"] as CalendarView[]).map((option) => (
            <button
              className={view === option ? styles.active : ""}
              type="button"
              key={option}
              onClick={() => onViewChange(option)}
              data-testid={`view-toggle-${option.toLowerCase()}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {view === "List" ? (
        <div className={styles.calendarListView}>
          {filteredPayments.map((payment) => {
            const toneClass = styles[payment.tone] || "";
            return (
              <article key={payment.name}>
                <span className={`${styles.serviceLogo} ${toneClass}`}>{payment.logo}</span>
                <div>
                  <strong>{payment.name}</strong>
                  <small>
                    Day {payment.day} · {payment.category}
                  </small>
                </div>
                <b>{payment.amount} UAH</b>
              </article>
            );
          })}
        </div>
      ) : (
        <div className={styles.calendarGrid}>
          {WEEKDAY_LABELS.map((weekday) => (
            <div className={styles.weekday} key={weekday}>
              {weekday}
            </div>
          ))}
          {shownDays.map((date) => {
            const payment =
              isCurrentDisplayMonth && date.currentMonth
                ? filteredPayments.find((item) => item.day === date.day)
                : undefined;
            const isToday = isCurrentDisplayMonth && date.currentMonth && date.day === 1;

            const toneClass = payment ? styles[payment.tone] || "" : "";

            return (
              <div
                className={`${styles.calendarDay} ${date.currentMonth ? "" : styles.outside} ${isToday ? styles.today : ""}`}
                key={`${date.year}-${date.month}-${date.day}`}
              >
                <span className={styles.dayNumber}>{date.day}</span>
                {isToday && <small className={styles.todayLabel}>TODAY</small>}
                {payment && (
                  <div
                    className={`${styles.paymentBadge} ${payment.urgent ? styles.highlighted : ""}`}
                  >
                    <span className={`${styles.serviceLogo} ${toneClass}`}>{payment.logo}</span>
                    <div>
                      <strong>{payment.name}</strong>
                      <small>{payment.amount} UAH</small>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
