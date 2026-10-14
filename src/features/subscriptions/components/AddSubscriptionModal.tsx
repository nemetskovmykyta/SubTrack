import { FormEvent, useState } from "react";
import { Modal } from "../../../components/ui";
import { Icon } from "../../../components/icons";
import { IconName, Subscription, SubscriptionCategory } from "../../../types";

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
      <form
        onSubmit={handleSubmit}
        className="add-sub-form text-left"
        data-testid="add-subscription-form"
      >
        {error && (
          <div className="mb-4 text-xs text-rose-400 bg-rose-950/40 p-2 rounded border border-rose-800/40">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">
            Service Name
          </label>
          <input
            type="text"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
            placeholder="e.g. YouTube Premium"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            data-testid="input-sub-name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">
            Category
          </label>
          <select
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
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

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">
              Price (UAH)
            </label>
            <input
              type="number"
              step="any"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              placeholder="150"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
              data-testid="input-sub-price"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">
              Cycle
            </label>
            <select
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500"
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value as "monthly" | "yearly")}
              data-testid="select-sub-cycle"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button type="button" className="logout-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="logout-confirm !bg-indigo-600 hover:!bg-indigo-500"
            data-testid="btn-submit-subscription"
          >
            Add Subscription
          </button>
        </div>
      </form>
    </Modal>
  );
}
