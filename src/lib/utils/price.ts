import { shopConfig } from "@/config/shop.config";

export function formatPrice(paise: number): string {
  const rupees = paise / 100;
  return `${shopConfig.currencySymbol}${rupees.toLocaleString("en-IN", {
    minimumFractionDigits: rupees % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

export function getDiscountPercent(mrpInPaise: number, sellingInPaise: number): number {
  if (mrpInPaise <= sellingInPaise) return 0;
  return Math.round(((mrpInPaise - sellingInPaise) / mrpInPaise) * 100);
}

export function getEffectivePrice(product: { priceInPaise: number; discountPriceInPaise?: number }): number {
  return product.discountPriceInPaise ?? product.priceInPaise;
}

export function calculateDeliveryCharge(subtotalInPaise: number, deliveryChargeInPaise: number, freeThresholdInPaise: number): number {
  return subtotalInPaise >= freeThresholdInPaise ? 0 : deliveryChargeInPaise;
}
