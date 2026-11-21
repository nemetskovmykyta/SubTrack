import { useState } from "react";
import { Icon } from "../../../components/icons";
import { ServiceSavings } from "../../../types";
import { SAVINGS_SERVICES } from "../../../services";
import { calculateSavings, formatNumber } from "../../../utils";
import styles from "./SavingsSimulator.module.css";

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
      className={`${styles.savingsCalculator} ${simulated ? styles.simulated : ""}`}
      data-testid="savings-calculator"
    >
      <div className={styles.calculatorIntro}>
        <span className={styles.calculatorIcon}>
          <Icon name="spark" />
        </span>
        <div>
          <span className={styles.calculatorLabel}>WHAT-IF SCENARIO</span>
          <h2>
            Savings Calculator <em>Gamification</em>
          </h2>
          <p>Select a subscription to see your potential savings over time.</p>
        </div>
      </div>

      <div className={styles.calculatorControls}>
        <label htmlFor="service-select">Subscription</label>
        <div className={styles.serviceSelectWrap}>
          <span className={styles.serviceLogo}>{selectedService.name.charAt(0)}</span>
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

      <div className={styles.outcomeGrid}>
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
        className={styles.simulateButton}
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
