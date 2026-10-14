import { Subscription } from "../types";

/**
 * Calculates the total monthly spending from an array of subscriptions.
 */
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

/**
 * Calculates total yearly spending.
 */
export function calculateYearlyTotal(subscriptions: Subscription[]): number {
  return calculateMonthlyTotal(subscriptions) * 12;
}

/**
 * Calculates savings over multiple years.
 */
export function calculateSavings(monthlyAmount: number, years = 1): number {
  return monthlyAmount * 12 * years;
}
