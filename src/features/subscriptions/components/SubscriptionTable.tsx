import { Subscription } from "../../../types";
import { Icon } from "../../../components/icons";
import { SubscriptionRow } from "./SubscriptionRow";

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
      className="dashboard-card subscriptions-card"
      id="subscriptions"
      data-testid="subscriptions-table-section"
    >
      <div className="subscriptions-header">
        <div className="section-title">
          <div>
            <h2>Active Subscriptions</h2>
            <p>Manage your recurring payments</p>
          </div>
        </div>
        <div className="table-tools">
          <label className="search-box">
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
          <div className="category-select-wrap">
            <select
              className="filter-button"
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

      <div className="subscription-table">
        <div className="table-head">
          <span>SUBSCRIPTION</span>
          <span>CATEGORY</span>
          <span>BILLING</span>
          <span>STATUS</span>
          <span>ACTIONS</span>
        </div>

        {subscriptions.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            No subscriptions found matching your query.
          </div>
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

      <div className="table-footer">
        <span>
          Showing {subscriptions.length} of {totalCount} subscriptions
        </span>
        <a href="#all">View all subscriptions →</a>
      </div>
    </section>
  );
}
