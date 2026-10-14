import { useMemo, useState } from "react";
import { DashboardNav, Icon } from "./DashboardPage";

type Category = "Entertainment" | "Work" | "Sport" | "Utilities";
type CalendarView = "Month" | "Week" | "List";

const payments = [
  {
    day: 2,
    name: "Netflix",
    amount: 200,
    category: "Entertainment" as Category,
    logo: "N",
    tone: "netflix",
    urgent: true,
  },
  {
    day: 5,
    name: "Spotify",
    amount: 150,
    category: "Entertainment" as Category,
    logo: "●",
    tone: "spotify",
  },
  {
    day: 15,
    name: "SportLife",
    amount: 800,
    category: "Sport" as Category,
    logo: "S",
    tone: "sportlife",
  },
  { day: 20, name: "iCloud", amount: 50, category: "Work" as Category, logo: "☁", tone: "icloud" },
  {
    day: 28,
    name: "Patreon",
    amount: 150,
    category: "Utilities" as Category,
    logo: "P",
    tone: "patreon",
  },
];

const categories: Category[] = ["Entertainment", "Work", "Sport", "Utilities"];
const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const monthLabels = [
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
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(categories);

  const visibleMonth = new Date(2026, 8 + monthOffset, 1);
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const monthName = monthLabels[month];
  const isSeptember = month === 8 && year === 2026;

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

  const filteredPayments = payments.filter((payment) =>
    selectedCategories.includes(payment.category)
  );
  const shownDays = view === "Week" ? days.slice(0, 7) : days;

  const toggleCategory = (category: Category) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category]
    );
  };

  return (
    <main className="dashboard-shell calendar-shell">
      <DashboardNav active="calendar" />

      <div className="dashboard-content calendar-content">
        <div className="dashboard-heading calendar-heading">
          <div>
            <p className="dash-eyebrow">PAYMENTS & SCHEDULE</p>
            <h1>Payment Calendar</h1>
            <p>Plan ahead and keep every recurring payment in view.</p>
          </div>
          <div className="calendar-heading-meta">
            <span>
              <Icon name="calendar" />
            </span>
            <div>
              <strong>September overview</strong>
              <small>5 scheduled payments</small>
            </div>
          </div>
        </div>

        <div className="calendar-layout">
          <section className="dashboard-card calendar-card" aria-label="Payment calendar">
            <div className="calendar-toolbar">
              <div className="month-switcher">
                <button
                  type="button"
                  aria-label="Previous month"
                  onClick={() => setMonthOffset((value) => value - 1)}
                >
                  ‹
                </button>
                <strong>
                  {monthName} {year}
                </strong>
                <button
                  type="button"
                  aria-label="Next month"
                  onClick={() => setMonthOffset((value) => value + 1)}
                >
                  ›
                </button>
              </div>
              <div className="view-toggle" aria-label="Calendar view">
                {(["Month", "Week", "List"] as CalendarView[]).map((option) => (
                  <button
                    className={view === option ? "active" : ""}
                    type="button"
                    key={option}
                    onClick={() => setView(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {view === "List" ? (
              <div className="calendar-list-view">
                {filteredPayments.map((payment) => (
                  <article key={payment.name}>
                    <span className={`service-logo ${payment.tone}`}>{payment.logo}</span>
                    <div>
                      <strong>{payment.name}</strong>
                      <small>
                        September {payment.day} · {payment.category}
                      </small>
                    </div>
                    <b>{payment.amount} UAH</b>
                  </article>
                ))}
              </div>
            ) : (
              <div className={`calendar-grid ${view === "Week" ? "week-view" : ""}`}>
                {weekdayLabels.map((weekday) => (
                  <div className="weekday" key={weekday}>
                    {weekday}
                  </div>
                ))}
                {shownDays.map((date) => {
                  const payment =
                    isSeptember && date.currentMonth
                      ? filteredPayments.find((item) => item.day === date.day)
                      : undefined;
                  const isToday = isSeptember && date.currentMonth && date.day === 1;
                  return (
                    <div
                      className={`calendar-day ${date.currentMonth ? "" : "outside"} ${isToday ? "today" : ""}`}
                      key={`${date.year}-${date.month}-${date.day}`}
                    >
                      <span className="day-number">{date.day}</span>
                      {isToday && <small className="today-label">TODAY</small>}
                      {payment && (
                        <div className={`payment-badge ${payment.urgent ? "highlighted" : ""}`}>
                          <span className={`service-logo ${payment.tone}`}>{payment.logo}</span>
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

          <aside className="calendar-sidebar">
            <section className="dashboard-card due-card">
              <div className="sidebar-card-title">
                <span className="metric-icon indigo">
                  <Icon name="wallet" />
                </span>
                <p>Total Due This Month</p>
              </div>
              <h2>
                1,350 <span>UAH</span>
              </h2>
              <div className="due-progress-copy">
                <span>350 UAH paid</span>
                <strong>1,000 UAH remaining</strong>
              </div>
              <div className="due-progress">
                <span />
              </div>
              <small>26% of monthly payments completed</small>
            </section>

            <section className="dashboard-card upcoming-panel">
              <div className="section-title">
                <div>
                  <h2>Upcoming in Next 7 Days</h2>
                  <p>Payments that need your attention</p>
                </div>
                <span className="upcoming-count">2</span>
              </div>
              <div className="upcoming-calendar-list">
                <article>
                  <span className="service-logo netflix">N</span>
                  <div>
                    <strong>Netflix</strong>
                    <small>Tomorrow (Sep 2)</small>
                  </div>
                  <div>
                    <strong>200 UAH</strong>
                    <span className="alert-badge">Due soon</span>
                  </div>
                </article>
                <article>
                  <span className="service-logo spotify">●</span>
                  <div>
                    <strong>Spotify</strong>
                    <small>In 4 days (Sep 5)</small>
                  </div>
                  <div>
                    <strong>150 UAH</strong>
                  </div>
                </article>
              </div>
            </section>

            <section className="dashboard-card category-filter">
              <div className="section-title">
                <div>
                  <h2>Filter by Category</h2>
                  <p>Choose what appears on your calendar</p>
                </div>
              </div>
              <div className="category-options">
                {categories.map((category) => (
                  <label key={category}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className={`filter-check ${category.toLowerCase()}`} />
                    <strong>{category}</strong>
                    <small>
                      {payments.filter((payment) => payment.category === category).length}
                    </small>
                  </label>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
