import { describe, it, expect } from "vitest";
import { formatCurrency, formatNumber, formatPercentage } from "./formatters";

describe("formatters utils", () => {
  it("formatCurrency formats amount with default currency UAH", () => {
    expect(formatCurrency(1250)).toBe("1,250 UAH");
    expect(formatCurrency(0)).toBe("0 UAH");
  });

  it("formatCurrency supports custom currency", () => {
    expect(formatCurrency(99, "USD")).toBe("99 USD");
    expect(formatCurrency(15000, "EUR")).toBe("15,000 EUR");
  });

  it("formatNumber formats numbers with commas", () => {
    expect(formatNumber(15000)).toBe("15,000");
    expect(formatNumber(1250)).toBe("1,250");
  });

  it("formatPercentage formats positive and negative percentage strings", () => {
    expect(formatPercentage(5.2)).toBe("+5.2%");
    expect(formatPercentage(-3.1)).toBe("-3.1%");
  });
});
