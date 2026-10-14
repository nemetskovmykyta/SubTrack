import { Icon } from "../../../components/icons";
import { MonthlySpending } from "../../../types";
import { MONTHLY_SPENDING_DATA } from "../../../services";

export interface SpendingBarChartProps {
  data?: MonthlySpending[];
}

export function SpendingBarChart({ data = MONTHLY_SPENDING_DATA }: SpendingBarChartProps) {
  return (
    <article className="dashboard-card spending-chart-card">
      <div className="section-title">
        <div>
          <h2>Monthly Expenses Overview</h2>
          <p>Total subscription spend by month</p>
        </div>
        <button type="button">
          2026 <Icon name="chevron" />
        </button>
      </div>

      <div className="bar-chart">
        <div className="chart-scale" aria-hidden="true">
          <span>2,000</span>
          <span>1,500</span>
          <span>1,000</span>
          <span>500</span>
          <span>0</span>
        </div>
        <div className="chart-bars">
          <div className="chart-grid-lines" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          {data.map((month) => (
            <div className="bar-column" key={month.label}>
              <div
                className={`expense-bar ${month.peak ? "peak" : ""}`}
                style={{ height: `${month.value}%` }}
              >
                {month.peak && <span>{month.label === "Sep" ? "1,840" : "1,660"}</span>}
              </div>
              <small>{month.label}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="chart-insight">
        <span>
          <i className="standard" /> Monthly spend
        </span>
        <span>
          <i className="peak" /> Peak month
        </span>
        <p>
          <strong>September</strong> was your highest-spending month.
        </p>
      </div>
    </article>
  );
}
