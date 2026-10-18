import { Icon } from "../../../components/icons";
import { MonthlySpending } from "../../../types";
import { MONTHLY_SPENDING_DATA } from "../../../services";
import styles from "./SpendingBarChart.module.css";

export interface SpendingBarChartProps {
  data?: MonthlySpending[];
}

export function SpendingBarChart({ data = MONTHLY_SPENDING_DATA }: SpendingBarChartProps) {
  return (
    <article className={styles.spendingChartCard}>
      <div className={styles.sectionTitle}>
        <div>
          <h2>Monthly Expenses Overview</h2>
          <p>Total subscription spend by month</p>
        </div>
        <button type="button" className={styles.yearButton}>
          2026 <Icon name="chevron" />
        </button>
      </div>

      <div className={styles.barChart}>
        <div className={styles.chartScale} aria-hidden="true">
          <span>2,000</span>
          <span>1,500</span>
          <span>1,000</span>
          <span>500</span>
          <span>0</span>
        </div>
        <div className={styles.chartBars}>
          <div className={styles.chartGridLines} aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          {data.map((month) => (
            <div className={styles.barColumn} key={month.label}>
              <div
                className={`${styles.expenseBar} ${month.peak ? styles.peak : ""}`}
                style={{ height: `${month.value}%` }}
              >
                {month.peak && <span>{month.label === "Sep" ? "1,840" : "1,660"}</span>}
              </div>
              <small>{month.label}</small>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chartInsight}>
        <span>
          <i className={styles.standardDot} /> Monthly spend
        </span>
        <span>
          <i className={styles.peakDot} /> Peak month
        </span>
        <p>
          <strong>September</strong> was your highest-spending month.
        </p>
      </div>
    </article>
  );
}
