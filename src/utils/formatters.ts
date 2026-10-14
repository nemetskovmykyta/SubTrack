/**
 * Formats a number into a localized currency string.
 * Example: 1250 => "1,250 UAH"
 */
export function formatCurrency(amount: number, currency = "UAH"): string {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${formatted} ${currency}`;
}

/**
 * Formats a number with commas.
 * Example: 15000 => "15,000"
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats percentage with sign.
 * Example: 5.2 => "+5.2%"
 */
export function formatPercentage(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value}%`;
}
