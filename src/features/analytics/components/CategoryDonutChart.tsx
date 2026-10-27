import { Icon } from "../../../components/icons";
import styles from "./CategoryDonutChart.module.css";

export interface CategoryDonutChartProps {
  totalAmount?: number;
}

export function CategoryDonutChart({ totalAmount = 1250 }: CategoryDonutChartProps) {
  return (
    <article className={styles.categoryCard} id="analytics" data-testid="category-card">
      <div className={styles.sectionTitle}>
        <div>
          <h2>Expenses by Category</h2>
          <p>Monthly distribution</p>
        </div>
        <button type="button" className={styles.timeButton}>
          This month <Icon name="chevron" />
        </button>
      </div>
      <div className={styles.chartContent}>
        <div className={styles.donutChart}>
          <div className={styles.donutHole}>
            <strong>{totalAmount.toLocaleString()}</strong>
            <span>UAH total</span>
          </div>
        </div>
        <div className={styles.chartLegend}>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.purple}`} />
            <div className={styles.legendInfo}>
              <p>Entertainment</p>
              <small>Netflix, Spotify</small>
            </div>
            <strong className={styles.legendPercent}>45%</strong>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.blue}`} />
            <div className={styles.legendInfo}>
              <p>Work</p>
              <small>Cloud, software</small>
            </div>
            <strong className={styles.legendPercent}>30%</strong>
          </div>
          <div className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.teal}`} />
            <div className={styles.legendInfo}>
              <p>Utilities</p>
              <small>Mobile, internet</small>
            </div>
            <strong className={styles.legendPercent}>25%</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
