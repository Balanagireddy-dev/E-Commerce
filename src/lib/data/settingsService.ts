import { shopConfig } from "@/config/shop.config";

/**
 * Data-access layer for shop-wide settings that admins can tune at runtime
 * (mirrors the products/offers override pattern in productService.ts).
 */

export interface ShopSettings {
  deliveryChargeInPaise: number;
  freeDeliveryThresholdInPaise: number;
}

const SETTINGS_OVERRIDE_KEY = "kirana_settings_override_v1";

function loadInitialSettings(): ShopSettings {
  const base: ShopSettings = {
    deliveryChargeInPaise: shopConfig.deliveryChargeInPaise,
    freeDeliveryThresholdInPaise: shopConfig.freeDeliveryThresholdInPaise,
  };
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(SETTINGS_OVERRIDE_KEY);
    return raw ? { ...base, ...(JSON.parse(raw) as Partial<ShopSettings>) } : base;
  } catch {
    return base;
  }
}

let settings: ShopSettings = loadInitialSettings();

function persistSettings() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_OVERRIDE_KEY, JSON.stringify(settings));
}

export function getShopSettings(): ShopSettings {
  return settings;
}

export async function updateShopSettings(patch: Partial<ShopSettings>): Promise<ShopSettings> {
  settings = { ...settings, ...patch };
  persistSettings();
  return settings;
}
