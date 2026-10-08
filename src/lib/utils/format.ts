
import type { ProductUnit } from "@/types/product";

// Convert numbers into Bengali digits
export function formatBanglaNumber(
  value: number,
  decimals = 0
): string {
  return value.toLocaleString("bn-BD", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// Format product price
export function formatPrice(price: number): string {
  return `${formatBanglaNumber(price)} টাকা`;
}

// Convert units into Bengali
export function formatUnit(unit: ProductUnit): string {
  const units: Record<ProductUnit, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return units[unit];
}

// Format percentage (without direction arrow)
export function formatPercentage(pct: number): string {
  return `${formatBanglaNumber(Math.abs(pct), 1)}%`;
}
