import { useState } from "react";
import { Icon } from "../../../components/icons";
import { ServiceSavings } from "../../../types";
import { SAVINGS_SERVICES } from "../../../services";
import { calculateSavings, formatNumber } from "../../../utils";

export interface SavingsSimulatorProps {
  services?: ServiceSavings[];
}

export function SavingsSimulator({ services = SAVINGS_SERVICES }: SavingsSimulatorProps) {
  const [selectedService, setSelectedService] = useState<ServiceSavings>(services[0]);
  const [simulated, setSimulated] = useState(false);

  const yearlySavings = calculateSavings(selectedService.monthly, 1);
  const fiveYearSavings = calculateSavings(selectedService.monthly, 5);

  return (
    <section
      className={`savings-calculator ${simulated ? "simulated" : ""}`}
      data-testid="savings-calculator"
    >
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
            {formatNumber(yearlySavings)} <small>UAH</small>
          </strong>
          <p>That’s 12 months without {selectedService.name}</p>
        </article>
        <article>
          <span>5 YEAR SAVINGS</span>
          <strong>
            {formatNumber(fiveYearSavings)} <small>UAH</small>
          </strong>
          <p>Enough for a meaningful financial goal</p>
        </article>
      </div>

      <button
        className="simulate-button"
        type="button"
        onClick={() => setSimulated((value) => !value)}
        data-testid="simulate-btn"
      >
        <Icon name="spark" />
        {simulated ? "Simulation Active" : "Simulate Cancellation"}
        <span>→</span>
      </button>
    </section>
  );
}
