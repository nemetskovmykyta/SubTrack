import { FormEvent, useState } from "react";
import { Modal } from "../../../components/ui";
import { Icon } from "../../../components/icons";
import { IconName, Subscription, SubscriptionCategory } from "../../../types";
import styles from "./AddSubscriptionModal.module.css";

export interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (sub: Omit<Subscription, "id">) => void;
}

export function AddSubscriptionModal({ isOpen, onClose, onAdd }: AddSubscriptionModalProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SubscriptionCategory>("Entertainment");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a service name");
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError("Please enter a valid price");
      return;
    }

    const tones: Subscription["tone"][] = ["indigo", "orange", "blue", "coral", "green"];
    const icons: IconName[] = ["spark", "sport", "cloud", "heart", "wallet"];
    const randomIdx = Math.floor(Math.random() * tones.length);

    onAdd({
      name: name.trim(),
      category,
      price: numPrice,
      currency: "UAH",
      billingCycle,
      nextPaymentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      icon: icons[randomIdx],
      tone: tones[randomIdx],
      status: "active",
    });

    setName("");
    setPrice("");
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Subscription"
      icon={<Icon name="wallet" />}
    >
      <form onSubmit={handleSubmit} className={styles.form} data-testid="add-subscription-form">
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.formGroup}>
          <label htmlFor="sub-name">Service Name</label>
          <input
            id="sub-name"
            type="text"
            className={styles.inputField}
            placeholder="e.g. YouTube Premium"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            data-testid="input-sub-name"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sub-category">Category</label>
          <select
            id="sub-category"
            className={styles.selectField}
            value={category}
            onChange={(e) => setCategory(e.target.value as SubscriptionCategory)}
            data-testid="select-sub-category"
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Work">Work</option>
            <option value="Sport">Sport</option>
            <option value="Utilities">Utilities</option>
            <option value="Cloud Storage">Cloud Storage</option>
            <option value="Donations">Donations</option>
          </select>
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label htmlFor="sub-price">Price (UAH)</label>
            <input
              id="sub-price"
              type="number"
              step="any"
              className={styles.inputField}
              placeholder="150"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
              data-testid="input-sub-price"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="sub-cycle">Cycle</label>
            <select
              id="sub-cycle"
              className={styles.selectField}
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")}
              data-testid="select-sub-cycle"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={styles.submitBtn} data-testid="btn-submit-subscription">
            Add Subscription
          </button>
        </div>
      </form>
    </Modal>
  );
}
