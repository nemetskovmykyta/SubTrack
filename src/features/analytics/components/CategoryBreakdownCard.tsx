import { Icon } from "../../../components/icons";
import styles from "./CategoryBreakdownCard.module.css";

export function CategoryBreakdownCard() {
  return (
    <article className={styles.analyticsDonutCard}>
      <div className={styles.sectionTitle}>
        <div>
          <h2>Expenses by Category</h2>
          <p>Current month breakdown</p>
        </div>
        <button type="button" aria-label="More options">
          <Icon name="more" />
        </button>
      </div>
      <div className={styles.analyticsDonutWrap}>
        <div className={styles.donutChart}>
          <div className={styles.donutHole}>
            <strong>1,250</strong>
            <span>UAH total</span>
          </div>
        </div>
      </div>
      <div className={styles.analyticsLegend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.purple}`} />
          <p>Entertainment</p>
          <strong>562.50 UAH</strong>
          <em>45%</em>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.blue}`} />
          <p>Work</p>
          <strong>375.00 UAH</strong>
          <em>30%</em>
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.teal}`} />
          <p>Utilities</p>
          <strong>312.50 UAH</strong>
          <em>25%</em>
        </div>
      </div>
    </article>
  );
}
