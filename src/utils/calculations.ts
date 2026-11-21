import { Subscription } from "../types";

export function calculateMonthlyTotal(subscriptions: Subscription[]): number {
  return subscriptions
    .filter((sub) => sub.status === "active")
    .reduce((total, sub) => {
      if (sub.billingCycle === "yearly") {
        return total + Math.round(sub.price / 12);
      }
      return total + sub.price;
    }, 0);
}

export function calculateYearlyTotal(subscriptions: Subscription[]): number {
  return calculateMonthlyTotal(subscriptions) * 12;
}

export function calculateSavings(monthlyAmount: number, years = 1): number {
  return monthlyAmount * 12 * years;
}
