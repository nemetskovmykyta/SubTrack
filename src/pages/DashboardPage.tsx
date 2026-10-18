import { useState } from "react";
import { DashboardNav } from "../components/layout";
import { Icon } from "../components/icons";
import { SummaryGrid, SubscriptionTable, AddSubscriptionModal } from "../features/subscriptions";
import { CategoryDonutChart, NextChargesList } from "../features/analytics";
import { useSubscriptions } from "../hooks";
import styles from "./DashboardPage.module.css";

// Re-export for backwards compatibility
export { DashboardNav } from "../components/layout";
export { Icon } from "../components/icons";

export default function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const {
    filteredSubscriptions,
    subscriptions,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    monthlyTotal,
    yearlyTotal,
    activeCount,
    addSubscription,
    deleteSubscription,
  } = useSubscriptions();

  return (
    <main className={styles.dashboardShell}>
      <DashboardNav active="dashboard" onAddSubscription={() => setIsAddModalOpen(true)} />

      <div className={styles.dashboardContent} id="overview">
        <div className={styles.dashboardHeading}>
          <div>
            <span className={styles.dashEyebrow}>OVERVIEW</span>
            <h1>Good evening, Mykyta</h1>
            <p>Here’s what’s happening with your recurring subscriptions.</p>
          </div>
          <div className={styles.dateChip}>
            <Icon name="calendar" /> October 2026
          </div>
        </div>

        {/* 3 Summary Metrics */}
        <SummaryGrid
          monthlyTotal={monthlyTotal}
          yearlyTotal={yearlyTotal}
          activeCount={activeCount}
        />

        {/* Charts & Next Charges */}
        <div className={styles.middleGrid}>
          <CategoryDonutChart totalAmount={monthlyTotal} />
          <NextChargesList />
        </div>

        {/* Subscriptions Table */}
        <SubscriptionTable
          subscriptions={filteredSubscriptions}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onDelete={deleteSubscription}
          totalCount={subscriptions.length}
        />
      </div>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addSubscription}
      />
    </main>
  );
}
