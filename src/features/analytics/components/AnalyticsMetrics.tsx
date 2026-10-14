import { Icon } from "../../../components/icons";

export function AnalyticsMetrics() {
  return (
    <section className="analytics-metrics" aria-label="Financial overview">
      <article className="analytics-metric-card">
        <div className="analytics-metric-head">
          <span className="metric-icon indigo">
            <Icon name="spark" />
          </span>
          <span className="tiny-chart" aria-hidden="true">
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
        <div className="metric-note positive">
          <span>↗</span> 5.2% <em>from last year</em>
        </div>
      </article>

      <article className="analytics-metric-card">
        <div className="analytics-metric-head">
          <span className="metric-icon blue">
            <Icon name="calendar" />
          </span>
          <span className="metric-kicker">MONTHLY AVG</span>
        </div>
        <p>Average Monthly Cost</p>
        <h2>
          1,250 <small>UAH</small>
        </h2>
        <div className="metric-note">
          <span>12</span> payments per month
        </div>
      </article>

      <article className="analytics-metric-card savings-highlight">
        <div className="analytics-metric-head">
          <span className="metric-icon green">
            <Icon name="wallet" />
          </span>
          <span className="savings-pill">Save 24%</span>
        </div>
        <p>Potential Annual Savings</p>
        <h2>
          3,600 <small>UAH</small>
        </h2>
        <div className="metric-note savings-note">Based on underused subscriptions</div>
      </article>
    </section>
  );
}
