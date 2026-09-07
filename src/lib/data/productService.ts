import productsJson from "@/data/products.json";
import categoriesJson from "@/data/categories.json";
import offersJson from "@/data/offers.json";
import type { Product, Category, Offer } from "@/types/product";

/**
 * Data-access layer for products/categories/offers.
 * Every function is async so this file can be swapped for real REST/GraphQL/
 * Firebase/Supabase calls later without touching any UI component.
 */

const PRODUCTS_OVERRIDE_KEY = "kirana_products_override_v1";

function loadInitialProducts(): Product[] {
  const base = productsJson as Product[];
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(PRODUCTS_OVERRIDE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : base;
  } catch {
    return base;
  }
}

function persistProducts() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PRODUCTS_OVERRIDE_KEY, JSON.stringify(products));
}

const OFFERS_OVERRIDE_KEY = "kirana_offers_override_v1";

function loadInitialOffers(): Offer[] {
  const base = offersJson as Offer[];
  if (typeof window === "undefined") return base;
  try {
    const raw = window.localStorage.getItem(OFFERS_OVERRIDE_KEY);
    return raw ? (JSON.parse(raw) as Offer[]) : base;
  } catch {
    return base;
  }
}

function persistOffers() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OFFERS_OVERRIDE_KEY, JSON.stringify(offers));
}

let products: Product[] = loadInitialProducts();
const categories: Category[] = categoriesJson as Category[];
let offers: Offer[] = loadInitialOffers();

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

/**
 * Sync accessors for client components that need product lookups during
 * render (e.g. computing cart totals). Backed by the same in-memory array;
 * safe only while the data layer is local mock data.
 */
export function getProductByIdSync(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getAllProductsSync(): Product[] {
  return products;
}

export function getAllCategoriesSync(): Category[] {
  return categories;
}

export function getCategoryByIdSync(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return products.filter((p) => p.categoryId === categoryId);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit);
}

export async function getPopularProducts(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.isPopular).slice(0, limit);
}

export async function getBestSellerProducts(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getNewProducts(limit = 8): Promise<Product[]> {
  return products.filter((p) => p.isNew).slice(0, limit);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
  );
}

export interface ProductFilters {
  categoryId?: string;
  minPriceInPaise?: number;
  maxPriceInPaise?: number;
  query?: string;
  sortBy?: "popular" | "price-asc" | "price-desc" | "newest" | "rating";
}

export async function filterProducts(filters: ProductFilters): Promise<Product[]> {
  let result = [...products];

  if (filters.categoryId) {
    result = result.filter((p) => p.categoryId === filters.categoryId);
  }
  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }
  if (filters.minPriceInPaise !== undefined) {
    result = result.filter((p) => (p.discountPriceInPaise ?? p.priceInPaise) >= filters.minPriceInPaise!);
  }
  if (filters.maxPriceInPaise !== undefined) {
    result = result.filter((p) => (p.discountPriceInPaise ?? p.priceInPaise) <= filters.maxPriceInPaise!);
  }

  switch (filters.sortBy) {
    case "price-asc":
      result.sort((a, b) => (a.discountPriceInPaise ?? a.priceInPaise) - (b.discountPriceInPaise ?? b.priceInPaise));
      break;
    case "price-desc":
      result.sort((a, b) => (b.discountPriceInPaise ?? b.priceInPaise) - (a.discountPriceInPaise ?? a.priceInPaise));
      break;
    case "newest":
      result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
      break;
    case "rating":
      result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "popular":
    default:
      result.sort((a, b) => Number(b.isPopular) - Number(a.isPopular));
  }

  return result;
}

export async function getAllCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  return categories.find((c) => c.id === id);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find((c) => c.slug === slug);
}

export async function getAllOffers(): Promise<Offer[]> {
  return offers;
}

export async function createOffer(offer: Offer): Promise<Offer> {
  offers = [offer, ...offers];
  persistOffers();
  return offer;
}

export async function deleteOffer(id: string): Promise<void> {
  offers = offers.filter((o) => o.id !== id);
  persistOffers();
}

/** Admin mutations — mutate the in-memory array (mock backend). */
export async function createProduct(product: Product): Promise<Product> {
  products = [product, ...products];
  persistProducts();
  return product;
}

export async function updateProduct(id: string, patch: Partial<Product>): Promise<Product | undefined> {
  let updated: Product | undefined;
  products = products.map((p) => {
    if (p.id === id) {
      updated = { ...p, ...patch };
      return updated;
    }
    return p;
  });
  persistProducts();
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  products = products.filter((p) => p.id !== id);
  persistProducts();
}
