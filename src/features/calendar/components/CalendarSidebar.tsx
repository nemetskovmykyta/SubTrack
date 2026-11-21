import { Icon } from "../../../components/icons";
import { CalendarCategory } from "../../../types";
import styles from "./CalendarSidebar.module.css";

export interface CalendarSidebarProps {
  categories: CalendarCategory[];
  selectedCategories: CalendarCategory[];
  onToggleCategory: (category: CalendarCategory) => void;
}

export function CalendarSidebar({
  categories,
  selectedCategories,
  onToggleCategory,
}: CalendarSidebarProps) {
  return (
    <aside className={styles.calendarSidebar}>
      <section className={styles.dueCard}>
        <div className={styles.sidebarCardTitle}>
          <span className={styles.metricIcon}>
            <Icon name="wallet" />
          </span>
          <p>Total Due This Month</p>
        </div>
        <h2>
          1,350 <span>UAH</span>
        </h2>
        <div className={styles.dueProgressCopy}>
          <span>350 UAH paid</span>
          <strong>1,000 UAH remaining</strong>
        </div>
        <div className={styles.dueProgress}>
          <span className={styles.dueProgressBar} />
        </div>
        <small>26% of monthly payments completed</small>
      </section>

      <section className={styles.upcomingPanel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Upcoming in Next 7 Days</h2>
            <p>Payments that need your attention</p>
          </div>
          <span className={styles.upcomingCount}>2</span>
        </div>
        <div className={styles.upcomingCalendarList}>
          <article>
            <span className={`${styles.serviceLogo} ${styles.netflix}`}>N</span>
            <div className={styles.upcomingItemInfo}>
              <strong>Netflix</strong>
              <small>Tomorrow (Oct 19)</small>
            </div>
            <div className={styles.upcomingItemPrice}>
              <strong>200 UAH</strong>
              <span className={styles.alertBadge}>Due soon</span>
            </div>
          </article>
          <article>
            <span className={`${styles.serviceLogo} ${styles.spotify}`}>●</span>
            <div className={styles.upcomingItemInfo}>
              <strong>Spotify</strong>
              <small>In 4 days (Oct 22)</small>
            </div>
            <div className={styles.upcomingItemPrice}>
              <strong>150 UAH</strong>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.categoryFilterPanel}>
        <h3>Filter by Category</h3>
        <div className={styles.filterPills}>
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              className={`${styles.filterPill} ${selectedCategories.includes(cat) ? styles.active : ""}`}
              onClick={() => onToggleCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}
