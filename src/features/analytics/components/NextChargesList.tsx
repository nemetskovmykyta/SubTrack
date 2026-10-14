import { Link } from "react-router";

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
    <article className="dashboard-card charges-card" data-testid="charges-card">
      <div className="section-title">
        <div>
          <h2>Next Charges</h2>
          <p>Your upcoming payments</p>
        </div>
        <Link to="/calendar">View all →</Link>
      </div>
      <div className="charge-list">
        {charges.map((charge) => (
          <div className="charge-row" key={charge.name}>
            <span className={`service-logo ${charge.tone}`}>{charge.logo}</span>
            <div>
              <strong>{charge.name}</strong>
              <small>{charge.category}</small>
            </div>
            <div className="charge-date">
              <strong>{charge.price}</strong>
              <small className={charge.dueText === "Tomorrow" ? "tomorrow" : ""}>
                {charge.dueText}
              </small>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
