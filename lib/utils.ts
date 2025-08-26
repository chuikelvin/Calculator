import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, country: string = "kenya"): string {
  const currencyMap = {
    kenya: { locale: "en-KE", currency: "KES", symbol: "KSh" },
    uganda: { locale: "en-UG", currency: "UGX", symbol: "UGX" },
    tanzania: { locale: "en-TZ", currency: "TZS", symbol: "TSh" },
  };

  const config = currencyMap[country as keyof typeof currencyMap] || currencyMap.kenya;

  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    // Fallback to simple formatting with symbol
    return `${config.symbol} ${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
