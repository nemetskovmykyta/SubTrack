import { Subscription } from "../../../types";
import { Icon } from "../../../components/icons";
import { formatCurrency } from "../../../utils";
import styles from "./SubscriptionRow.module.css";

export interface SubscriptionRowProps {
  subscription: Subscription;
  onDelete?: (id: string) => void;
  onEdit?: (subscription: Subscription) => void;
}

export function SubscriptionRow({ subscription, onDelete, onEdit }: SubscriptionRowProps) {
  const toneClass = styles[subscription.tone] || styles.indigo;

  return (
    <div
      className={styles.subscriptionRow}
      key={subscription.id}
      data-testid={`subscription-row-${subscription.id}`}
    >
      <div className={styles.subscriptionName}>
        <span className={`${styles.subscriptionIcon} ${toneClass}`}>
          <Icon name={subscription.icon} />
        </span>
        <strong>{subscription.name}</strong>
      </div>
      <span className={styles.categoryCell}>{subscription.category}</span>
      <div className={styles.billingCell}>
        <strong>{formatCurrency(subscription.price, subscription.currency)}</strong>
        <span>/ {subscription.billingCycle === "yearly" ? "yr" : "mo"}</span>
      </div>
      <span className={styles.activeBadge}>
        <i /> {subscription.status === "active" ? "Active" : subscription.status}
      </span>
      <div className={styles.rowActions}>
        <button
          type="button"
          aria-label={`Edit ${subscription.name}`}
          onClick={() => onEdit?.(subscription)}
        >
          <Icon name="edit" />
        </button>
        <button
          type="button"
          aria-label={`Delete ${subscription.name}`}
          onClick={() => onDelete?.(subscription.id)}
          data-testid={`delete-subscription-${subscription.id}`}
        >
          <Icon name="trash" />
        </button>
      </div>
    </div>
  );
}
