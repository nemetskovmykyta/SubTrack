import { Icon } from "../../../components/icons";

export interface CategoryDonutChartProps {
  totalAmount?: number;
}

export function CategoryDonutChart({ totalAmount = 1250 }: CategoryDonutChartProps) {
  return (
    <article className="dashboard-card category-card" id="analytics" data-testid="category-card">
      <div className="section-title">
        <div>
          <h2>Expenses by Category</h2>
          <p>Monthly distribution</p>
        </div>
        <button type="button">
          This month <Icon name="chevron" />
        </button>
      </div>
      <div className="chart-content">
        <div className="donut-chart">
          <div>
            <strong>{totalAmount.toLocaleString()}</strong>
            <span>UAH total</span>
          </div>
        </div>
        <div className="chart-legend">
          <div>
            <span className="legend-dot purple" />
            <p>
              Entertainment<small>Netflix, Spotify</small>
            </p>
            <strong>45%</strong>
          </div>
          <div>
            <span className="legend-dot blue" />
            <p>
              Work<small>Cloud, software</small>
            </p>
            <strong>30%</strong>
          </div>
          <div>
            <span className="legend-dot teal" />
            <p>
              Utilities<small>Mobile, internet</small>
            </p>
            <strong>25%</strong>
          </div>
        </div>
      </div>
    </article>
  );
}
