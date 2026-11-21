import { useState } from "react";
import { DashboardNav } from "../components/layout";
import { Icon } from "../components/icons";
import { SummaryGrid, SubscriptionTable, AddSubscriptionModal } from "../features/subscriptions";
import { CategoryDonutChart, NextChargesList } from "../features/analytics";
import { useAuth, useSubscriptions } from "../hooks";
import styles from "./DashboardPage.module.css";

export { DashboardNav } from "../components/layout";
export { Icon } from "../components/icons";

export default function DashboardPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { user } = useAuth();

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

  const firstName = user?.name ? user.name.split(" ")[0] : "Mykyta";

  return (
    <main className={styles.dashboardShell}>
      <DashboardNav active="dashboard" onAddSubscription={() => setIsAddModalOpen(true)} />

      <div className={styles.dashboardContent} id="overview">
        <div className={styles.dashboardHeading}>
          <div>
            <span className={styles.dashEyebrow}>OVERVIEW</span>
            <h1>Good evening, {firstName}</h1>
            <p>Here’s what’s happening with your recurring subscriptions.</p>
          </div>
          <div className={styles.dateChip}>
            <Icon name="calendar" /> October 2026
          </div>
        </div>

        <SummaryGrid
          monthlyTotal={monthlyTotal}
          yearlyTotal={yearlyTotal}
          activeCount={activeCount}
        />

        <div className={styles.middleGrid}>
          <CategoryDonutChart totalAmount={monthlyTotal} />
          <NextChargesList />
        </div>

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

      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addSubscription}
      />
    </main>
  );
}
