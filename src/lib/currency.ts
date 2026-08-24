export type Currency = "PKR" | "USD";

// Fixed manual exchange rate: 1 USD = 280 PKR
export const USD_TO_PKR_RATE = 280;

/**
 * Formats a base PKR amount into either PKR or USD string representation.
 * @param amountInPKR The base price stored in the database.
 * @param currency The target currency to display.
 * @returns A formatted string (e.g., "Rs 12,500" or "$44.64")
 */
export function formatPrice(amountInPKR: number, currency: Currency = "PKR"): string {
  if (currency === "USD") {
    const usdAmount = amountInPKR / USD_TO_PKR_RATE;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(usdAmount);
  }

  // Format as PKR
  return `Rs ${new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 0,
  }).format(amountInPKR)}`;
}
