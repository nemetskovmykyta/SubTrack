import { useState } from "react";
import { DashboardNav } from "../components/layout";
import {
  AnalyticsMetrics,
  SpendingBarChart,
  CategoryBreakdownCard,
  SavingsSimulator,
} from "../features/analytics";
import styles from "./AnalyticsPage.module.css";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"12m" | "all">("12m");

  return (
    <main className={styles.analyticsShell}>
      <DashboardNav active="analytics" />

      <div className={styles.analyticsContent}>
        <div className={styles.heading}>
          <div>
            <span className={styles.eyebrow}>ANALYTICS & STATISTICS</span>
            <h1>Understand where your money goes</h1>
            <p>Explore spending patterns and uncover opportunities to save.</p>
          </div>
          <div className={styles.periodSwitcher}>
            <button
              className={period === "12m" ? styles.active : ""}
              type="button"
              onClick={() => setPeriod("12m")}
            >
              12 months
            </button>
            <button
              className={period === "all" ? styles.active : ""}
              type="button"
              onClick={() => setPeriod("all")}
            >
              All time
            </button>
          </div>
        </div>

        {/* 3 Overview Metrics */}
        <AnalyticsMetrics />

        {/* Charts Section */}
        <div className={styles.chartsGrid}>
          <SpendingBarChart />
          <CategoryBreakdownCard />
        </div>

        {/* What-If Savings Calculator */}
        <SavingsSimulator />
      </div>
    </main>
  );
}
