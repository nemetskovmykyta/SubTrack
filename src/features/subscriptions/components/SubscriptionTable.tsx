import { Subscription } from "../../../types";
import { Icon } from "../../../components/icons";
import { SubscriptionRow } from "./SubscriptionRow";
import styles from "./SubscriptionTable.module.css";

export interface SubscriptionTableProps {
  subscriptions: Subscription[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onDelete: (id: string) => void;
  totalCount: number;
}

const CATEGORIES = [
  "all",
  "Sport",
  "Entertainment",
  "Cloud Storage",
  "Donations",
  "Work",
  "Utilities",
];

export function SubscriptionTable({
  subscriptions,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onDelete,
  totalCount,
}: SubscriptionTableProps) {
  return (
    <section
      className={styles.subscriptionsCard}
      id="subscriptions"
      data-testid="subscriptions-table-section"
    >
      <div className={styles.subscriptionsHeader}>
        <div className={styles.sectionTitle}>
          <h2>Active Subscriptions</h2>
          <p>Manage your recurring payments</p>
        </div>
        <div className={styles.tableTools}>
          <label className={styles.searchBox}>
            <Icon name="search" />
            <input
              type="search"
              placeholder="Search subscriptions..."
              aria-label="Search subscriptions"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="search-subscriptions-input"
            />
          </label>
          <div className={styles.categorySelectWrap}>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              aria-label="Filter by category"
              data-testid="category-filter-select"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "All categories" : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.subscriptionTable}>
        <div className={styles.tableHead}>
          <span>SUBSCRIPTION</span>
          <span>CATEGORY</span>
          <span>BILLING</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {subscriptions.length === 0 ? (
          <div className={styles.emptyState}>No subscriptions found matching your query.</div>
        ) : (
          subscriptions.map((subscription) => (
            <SubscriptionRow
              key={subscription.id}
              subscription={subscription}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <div className={styles.tableFooter}>
        <span>
          Showing {subscriptions.length} of {totalCount} subscriptions
        </span>
        <a href="#all">View all subscriptions →</a>
      </div>
    </section>
  );
}
