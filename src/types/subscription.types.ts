import { IconName } from "./icon.types";

export type SubscriptionCategory =
  "Entertainment" | "Work" | "Sport" | "Utilities" | "Cloud Storage" | "Donations" | "Other";

export type SubscriptionStatus = "active" | "paused" | "canceled";

export interface Subscription {
  id: string;
  name: string;
  category: SubscriptionCategory;
  price: number;
  currency: string;
  billingCycle: "monthly" | "yearly";
  nextPaymentDate: string;
  icon: IconName;
  tone: "orange" | "blue" | "coral" | "green" | "purple" | "indigo";
  status: SubscriptionStatus;
}

export interface SubscriptionFilter {
  search: string;
  category: string;
}
