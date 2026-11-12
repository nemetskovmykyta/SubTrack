import { Icon } from "../../../components/icons";
import styles from "./AnalyticsMetrics.module.css";

export function AnalyticsMetrics() {
  return (
    <section className={styles.analyticsMetrics} aria-label="Financial overview">
      <article className={styles.metricCard}>
        <div className={styles.metricHead}>
          <span className={`${styles.metricIcon} ${styles.indigo}`}>
            <Icon name="spark" />
          </span>
          <span className={styles.tinyChart} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
        </div>
        <p>
          Total Spending <span>(YTD)</span>
        </p>
        <h2>
          15,000 <small>UAH</small>
        </h2>
        <div className={`${styles.metricNote} ${styles.positive}`}>
          <span>↗</span> 5.2% <em>from last year</em>
        </div>
      </article>

      <article className={styles.metricCard}>
        <div className={styles.metricHead}>
          <span className={`${styles.metricIcon} ${styles.blue}`}>
            <Icon name="calendar" />
          </span>
          <span className={styles.metricKicker}>MONTHLY AVG</span>
        </div>
        <p>Average Monthly Cost</p>
        <h2>
          1,250 <small>UAH</small>
        </h2>
        <div className={styles.metricNote}>
          <span>12</span> payments per month
        </div>
      </article>

      <article className={`${styles.metricCard} ${styles.savingsHighlight}`}>
        <div className={styles.metricHead}>
          <span className={`${styles.metricIcon} ${styles.green}`}>
            <Icon name="wallet" />
          </span>
          <span className={styles.savingsPill}>Save 24%</span>
        </div>
        <p>Potential Annual Savings</p>
        <h2>
          3,600 <small>UAH</small>
        </h2>
        <div className={`${styles.metricNote} ${styles.savingsNote}`}>
          Based on underused subscriptions
        </div>
      </article>
    </section>
  );
}
