import { Subscription } from "../../../types";
import { Icon } from "../../../components/icons";
import { formatCurrency } from "../../../utils";

export interface SubscriptionRowProps {
  subscription: Subscription;
  onDelete?: (id: string) => void;
  onEdit?: (subscription: Subscription) => void;
}

export function SubscriptionRow({ subscription, onDelete, onEdit }: SubscriptionRowProps) {
  return (
    <div
      className="subscription-row"
      key={subscription.id}
      data-testid={`subscription-row-${subscription.id}`}
    >
      <div className="subscription-name">
        <span className={`subscription-icon ${subscription.tone}`}>
          <Icon name={subscription.icon} />
        </span>
        <strong>{subscription.name}</strong>
      </div>
      <span className="category-cell">{subscription.category}</span>
      <div className="billing-cell">
        <strong>{formatCurrency(subscription.price, subscription.currency)}</strong>
        <span>/ {subscription.billingCycle === "yearly" ? "yr" : "mo"}</span>
      </div>
      <span className="active-badge">
        <i /> {subscription.status === "active" ? "Active" : subscription.status}
      </span>
      <div className="row-actions">
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
