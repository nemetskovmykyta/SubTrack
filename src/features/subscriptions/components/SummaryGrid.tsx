import { Icon } from "../../../components/icons";
import { formatNumber } from "../../../utils";

export interface SummaryGridProps {
  monthlyTotal: number;
  yearlyTotal: number;
  activeCount: number;
}

export function SummaryGrid({ monthlyTotal, yearlyTotal, activeCount }: SummaryGridProps) {
  return (
    <section className="summary-grid" aria-label="Expense summary" data-testid="summary-grid">
      <article className="summary-card" data-testid="metric-monthly">
        <div className="card-label">
          <span className="metric-icon indigo">
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
        <div className="metric-note positive">
          <span>↗</span> +5% <em>vs last month</em>
        </div>
        <div className="metric-glow indigo" />
      </article>

      <article className="summary-card" data-testid="metric-yearly">
        <div className="card-label">
          <span className="metric-icon teal">
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
        <div className="metric-note">
          <span>{activeCount}</span> active subscriptions
        </div>
        <div className="metric-glow teal" />
      </article>

      <article className="summary-card upcoming-card" data-testid="metric-upcoming">
        <div className="card-label">
          <span className="metric-icon amber">
            <Icon name="calendar" />
          </span>
          <p>Upcoming Payment</p>
          <span className="urgent-badge">Due soon</span>
        </div>
        <div className="upcoming-value">
          <span className="service-logo netflix">N</span>
          <div>
            <h2>Netflix</h2>
            <p>Tomorrow · 200 UAH</p>
          </div>
        </div>
        <div className="metric-glow amber" />
      </article>
    </section>
  );
}
