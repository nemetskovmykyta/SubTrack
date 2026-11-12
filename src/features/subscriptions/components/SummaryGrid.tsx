import { Icon } from "../../../components/icons";
import { formatNumber } from "../../../utils";
import styles from "./SummaryGrid.module.css";

export interface SummaryGridProps {
  monthlyTotal: number;
  yearlyTotal: number;
  activeCount: number;
}

export function SummaryGrid({ monthlyTotal, yearlyTotal, activeCount }: SummaryGridProps) {
  return (
    <section className={styles.summaryGrid} aria-label="Expense summary" data-testid="summary-grid">
      <article className={styles.summaryCard} data-testid="metric-monthly">
        <div className={styles.cardLabel}>
          <span className={`${styles.metricIcon} ${styles.indigo}`}>
            <Icon name="wallet" />
          </span>
          <p>Monthly Expenses</p>
          <button type="button" aria-label="More options">
            <Icon name="more" />
          </button>
        </div>
        <h2>
          {formatNumber(monthlyTotal)} <span>UAH</span>
        </h2>
        <div className={`${styles.metricNote} ${styles.positive}`}>
          <span>↗</span> +5% <em>vs last month</em>
        </div>
        <div className={`${styles.metricGlow} ${styles.indigo}`} />
      </article>

      <article className={styles.summaryCard} data-testid="metric-yearly">
        <div className={styles.cardLabel}>
          <span className={`${styles.metricIcon} ${styles.teal}`}>
            <Icon name="spark" />
          </span>
          <p>Yearly Expenses</p>
          <button type="button" aria-label="More options">
            <Icon name="more" />
          </button>
        </div>
        <h2>
          {formatNumber(yearlyTotal)} <span>UAH</span>
        </h2>
        <div className={styles.metricNote}>
          <span>{activeCount}</span> active subscriptions
        </div>
        <div className={`${styles.metricGlow} ${styles.teal}`} />
      </article>

      <article
        className={`${styles.summaryCard} ${styles.upcomingCard}`}
        data-testid="metric-upcoming"
      >
        <div className={styles.cardLabel}>
          <span className={`${styles.metricIcon} ${styles.amber}`}>
            <Icon name="calendar" />
          </span>
          <p>Upcoming Payment</p>
          <span className={styles.urgentBadge}>Due soon</span>
        </div>
        <div className={styles.upcomingValue}>
          <span className={`${styles.serviceLogo} ${styles.netflix}`}>N</span>
          <div>
            <h2>Netflix</h2>
            <p>Tomorrow · 200 UAH</p>
          </div>
        </div>
        <div className={`${styles.metricGlow} ${styles.amber}`} />
      </article>
    </section>
  );
}
