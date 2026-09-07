/**
 * Central shop configuration.
 * Cloning this template for a different Kirana/grocery shop should only
 * require editing this file (+ theme colors in tailwind.config.ts and
 * data in src/data/*.json) — never the UI components.
 */
export const shopConfig = {
  name: "Sri Venkateswara Kirana Store",
  shortName: "B&S Stores",
  tagline: "Fresh groceries, delivered fast to your door",
  logoText: "B&S",
  address: "1-14, Main Bazaar Road, Narapureddy Palli, Andhra Pradesh 523315",
  phone: "+91 9502900915",
  whatsapp: "+91 9502900915",
  email: "balanagireddymariyada96@gmail.com",

  currency: "INR",
  currencySymbol: "₹",

  deliveryChargeInPaise: 3000, // ₹30
  freeDeliveryThresholdInPaise: 25000, // ₹250

  storeHours: "7:00 AM – 10:00 PM, all days",
  estimatedDeliveryMinutes: 20,

  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },

  seo: {
    defaultTitle: "B&S Kirana Store — Online Grocery Shopping",
    defaultDescription:
      "Order groceries, snacks, dairy, and daily essentials online from SV Kirana Store. Fast local delivery, cash on delivery available.",
    siteUrl: "https://B&Skirana.com",
  },
} as const;

export type ShopConfig = typeof shopConfig;
