import { Link } from "react-router-dom";
import styles from "./NextChargesList.module.css";

export interface ChargeItem {
  name: string;
  category: string;
  price: string;
  dueText: string;
  logo: string;
  tone: string;
}

const DEFAULT_CHARGES: ChargeItem[] = [
  {
    name: "Netflix",
    category: "Entertainment",
    price: "200 UAH",
    dueText: "Tomorrow",
    logo: "N",
    tone: "netflix",
  },
  {
    name: "Spotify",
    category: "Entertainment",
    price: "150 UAH",
    dueText: "In 3 days",
    logo: "●",
    tone: "spotify",
  },
];

export function NextChargesList({ charges = DEFAULT_CHARGES }: { charges?: ChargeItem[] }) {
  return (
    <article className={styles.chargesCard} data-testid="charges-card">
      <div className={styles.sectionTitle}>
        <div>
          <h2>Next Charges</h2>
          <p>Your upcoming payments</p>
        </div>
        <Link to="/calendar">View all →</Link>
      </div>
      <div className={styles.chargeList}>
        {charges.map((charge) => {
          const toneClass = styles[charge.tone] || "";

          return (
            <div className={styles.chargeRow} key={charge.name}>
              <span className={`${styles.serviceLogo} ${toneClass}`}>{charge.logo}</span>
              <div className={styles.chargeInfo}>
                <strong>{charge.name}</strong>
                <small>{charge.category}</small>
              </div>
              <div className={styles.chargeDate}>
                <strong>{charge.price}</strong>
                <small className={charge.dueText === "Tomorrow" ? styles.tomorrow : ""}>
                  {charge.dueText}
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
