export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  /** Price in paise/cents (integer) to avoid floating point issues */
  priceInPaise: number;
  /** If set, this is the discounted selling price; priceInPaise becomes the strikethrough MRP */
  discountPriceInPaise?: number;
  unit: string; // e.g. "500 g", "1 L", "1 pack"
  images: string[]; // placeholder-safe identifiers, resolved via getProductImage()
  description: string;
  stock: number;
  isPopular?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  tags?: string[];
  rating?: number; // 0-5
  reviewCount?: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  icon: string; // emoji, keeps template dependency-free
  colorFrom: string;
  colorTo: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code?: string;
  categoryId?: string;
  bannerEmoji: string;
}
