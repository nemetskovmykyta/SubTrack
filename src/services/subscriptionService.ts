import { Subscription } from "../types";
import { storageService } from "./storageService";

const STORAGE_KEY = "subtrack_subscriptions";

export const INITIAL_SUBSCRIPTIONS: Subscription[] = [
  {
    id: "sub-1",
    name: "SportLife",
    category: "Sport",
    price: 800,
    currency: "UAH",
    billingCycle: "monthly",
    nextPaymentDate: "2026-10-15",
    icon: "sport",
    tone: "orange",
    status: "active",
  },
  {
    id: "sub-2",
    name: "iCloud",
    category: "Cloud Storage",
    price: 50,
    currency: "UAH",
    billingCycle: "monthly",
    nextPaymentDate: "2026-10-20",
    icon: "cloud",
    tone: "blue",
    status: "active",
  },
  {
    id: "sub-3",
    name: "Patreon",
    category: "Donations",
    price: 150,
    currency: "UAH",
    billingCycle: "monthly",
    nextPaymentDate: "2026-10-28",
    icon: "heart",
    tone: "coral",
    status: "active",
  },
  {
    id: "sub-4",
    name: "Netflix",
    category: "Entertainment",
    price: 200,
    currency: "UAH",
    billingCycle: "monthly",
    nextPaymentDate: "2026-10-14",
    icon: "spark",
    tone: "indigo",
    status: "active",
  },
  {
    id: "sub-5",
    name: "Spotify",
    category: "Entertainment",
    price: 150,
    currency: "UAH",
    billingCycle: "monthly",
    nextPaymentDate: "2026-10-17",
    icon: "spark",
    tone: "green",
    status: "active",
  },
];

export const subscriptionService = {
  getAll(): Subscription[] {
    return storageService.get<Subscription[]>(STORAGE_KEY, INITIAL_SUBSCRIPTIONS);
  },

  saveAll(subscriptions: Subscription[]): void {
    storageService.set(STORAGE_KEY, subscriptions);
  },

  add(subscription: Omit<Subscription, "id">): Subscription {
    const all = this.getAll();
    const newSub: Subscription = {
      ...subscription,
      id: `sub-${Date.now()}`,
    };
    const updated = [newSub, ...all];
    this.saveAll(updated);
    return newSub;
  },

  delete(id: string): void {
    const all = this.getAll();
    const updated = all.filter((s) => s.id !== id);
    this.saveAll(updated);
  },

  reset(): void {
    this.saveAll(INITIAL_SUBSCRIPTIONS);
  },
};
