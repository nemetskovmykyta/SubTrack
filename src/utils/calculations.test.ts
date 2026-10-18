import { describe, it, expect } from "vitest";
import { calculateMonthlyTotal, calculateYearlyTotal, calculateSavings } from "./calculations";
import { Subscription } from "../types";

describe("calculations utils", () => {
  const mockSubscriptions: Subscription[] = [
    {
      id: "1",
      name: "Netflix",
      category: "Entertainment",
      price: 200,
      currency: "UAH",
      billingCycle: "monthly",
      nextPaymentDate: "2026-10-20",
      icon: "spark",
      tone: "indigo",
      status: "active",
    },
    {
      id: "2",
      name: "Gym",
      category: "Sport",
      price: 12000,
      currency: "UAH",
      billingCycle: "yearly",
      nextPaymentDate: "2027-01-01",
      icon: "sport",
      tone: "orange",
      status: "active",
    },
    {
      id: "3",
      name: "Canceled Service",
      category: "Other",
      price: 500,
      currency: "UAH",
      billingCycle: "monthly",
      nextPaymentDate: "2026-10-20",
      icon: "wallet",
      tone: "coral",
      status: "canceled",
    },
  ];

  it("calculateMonthlyTotal calculates monthly total including prorated yearly subscriptions", () => {
    // 200 + Math.round(12000 / 12) = 200 + 1000 = 1200
    expect(calculateMonthlyTotal(mockSubscriptions)).toBe(1200);
  });

  it("calculateYearlyTotal returns monthly * 12", () => {
    expect(calculateYearlyTotal(mockSubscriptions)).toBe(14400);
  });

  it("calculateSavings calculates 1-year and 5-year savings accurately", () => {
    expect(calculateSavings(200, 1)).toBe(2400);
    expect(calculateSavings(200, 5)).toBe(12000);
  });
});
