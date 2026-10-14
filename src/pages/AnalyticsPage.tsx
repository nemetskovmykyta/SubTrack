import { useState } from "react";
import { DashboardNav, Icon } from "./DashboardPage";

const months = [
  { label: "Jan", value: 56 },
  { label: "Feb", value: 63 },
  { label: "Mar", value: 47 },
  { label: "Apr", value: 72 },
  { label: "May", value: 66 },
  { label: "Jun", value: 83, peak: true },
  { label: "Jul", value: 58 },
  { label: "Aug", value: 69 },
  { label: "Sep", value: 92, peak: true },
  { label: "Oct", value: 73 },
  { label: "Nov", value: 61 },
  { label: "Dec", value: 78 },
];

const services = [
  { name: "Netflix", monthly: 200 },
  { name: "SportLife", monthly: 800 },
  { name: "Spotify", monthly: 150 },
  { name: "Patreon", monthly: 150 },
  { name: "iCloud", monthly: 50 },
];

export default function AnalyticsPage() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [simulated, setSimulated] = useState(false);
  const yearlySavings = selectedService.monthly * 12;
  const fiveYearSavings = yearlySavings * 5;

  return (
    <main className="dashboard-shell analytics-shell">
      <DashboardNav active="analytics" />

      <div className="dashboard-content analytics-content">
        <div className="dashboard-heading">
          <div>
            <p className="dash-eyebrow">ANALYTICS & STATISTICS</p>
            <h1>Understand where your money goes</h1>
            <p>Explore spending patterns and uncover opportunities to save.</p>
          </div>
          <div className="analytics-period">
            <button className="active" type="button">
              12 months
            </button>
            <button type="button">All time</button>
          </div>
        </div>

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
            <div className="savings-glow" />
          </article>
        </section>

        <section className="analytics-charts">
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
                {months.map((month) => (
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

          <article className="dashboard-card analytics-donut-card">
            <div className="section-title">
              <div>
                <h2>Expenses by Category</h2>
                <p>Current month breakdown</p>
              </div>
              <button type="button" aria-label="More options">
                <Icon name="more" />
              </button>
            </div>
            <div className="analytics-donut-wrap">
              <div className="donut-chart analytics-donut">
                <div>
                  <strong>1,250</strong>
                  <span>UAH total</span>
                </div>
              </div>
            </div>
            <div className="analytics-legend">
              <div>
                <span className="legend-dot purple" />
                <p>Entertainment</p>
                <strong>562.50 UAH</strong>
                <em>45%</em>
              </div>
              <div>
                <span className="legend-dot blue" />
                <p>Work</p>
                <strong>375.00 UAH</strong>
                <em>30%</em>
              </div>
              <div>
                <span className="legend-dot teal" />
                <p>Utilities</p>
                <strong>312.50 UAH</strong>
                <em>25%</em>
              </div>
            </div>
          </article>
        </section>

        <section className={`savings-calculator ${simulated ? "simulated" : ""}`}>
          <div className="calculator-intro">
            <span className="calculator-icon">
              <Icon name="spark" />
            </span>
            <div>
              <span className="calculator-label">WHAT-IF SCENARIO</span>
              <h2>
                Savings Calculator <em>Gamification</em>
              </h2>
              <p>Select a subscription to see your potential savings over time.</p>
            </div>
          </div>

          <div className="calculator-controls">
            <label htmlFor="service-select">Subscription</label>
            <div className="service-select-wrap">
              <span className="service-logo netflix">{selectedService.name.charAt(0)}</span>
              <select
                id="service-select"
                value={selectedService.name}
                onChange={(event) => {
                  setSelectedService(
                    services.find((service) => service.name === event.target.value) ?? services[0]
                  );
                  setSimulated(false);
                }}
              >
                {services.map((service) => (
                  <option value={service.name} key={service.name}>
                    {service.name} — {service.monthly} UAH/mo
                  </option>
                ))}
              </select>
              <Icon name="chevron" />
            </div>
          </div>

          <div className="outcome-grid">
            <article>
              <span>1 YEAR SAVINGS</span>
              <strong>
                {yearlySavings.toLocaleString("en-US")} <small>UAH</small>
              </strong>
              <p>That’s 12 months without {selectedService.name}</p>
            </article>
            <article>
              <span>5 YEAR SAVINGS</span>
              <strong>
                {fiveYearSavings.toLocaleString("en-US")} <small>UAH</small>
              </strong>
              <p>Enough for a meaningful financial goal</p>
            </article>
          </div>

          <button
            className="simulate-button"
            type="button"
            onClick={() => setSimulated((value) => !value)}
          >
            <Icon name="spark" />
            {simulated ? "Simulation Active" : "Simulate Cancellation"}
            <span>→</span>
          </button>
        </section>
      </div>
    </main>
  );
}
