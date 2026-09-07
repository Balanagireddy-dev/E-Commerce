import type { Category } from "@/types/product";

/** Resolves a display image for a product. Falls back to its category artwork
 * when no explicit product image is set, so mock data stays lightweight. */
export function getProductImageSrc(images: string[] | undefined, category: Category | undefined): string {
  if (images && images.length > 0) return images[0];
  if (category) return `/images/categories/${category.slug}.svg`;
  return "/images/categories/placeholder.svg";
}
