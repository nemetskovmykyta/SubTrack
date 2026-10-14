import { Icon } from "../../../components/icons";

export function CategoryBreakdownCard() {
  return (
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
  );
}
