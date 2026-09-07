"use client";

import { useMemo } from "react";
import { useCart } from "@/context/CartContext";
import { getProductByIdSync, getCategoryByIdSync } from "@/lib/data/productService";
import { getEffectivePrice } from "@/lib/utils/price";
import { getProductImageSrc } from "@/lib/utils/image";
import type { CartItemView } from "@/types/cart";

export function useCartItems() {
  const { lines, ...cart } = useCart();

  const items: CartItemView[] = useMemo(() => {
    return lines
      .map((line) => {
        const product = getProductByIdSync(line.productId);
        if (!product) return null;
        const category = getCategoryByIdSync(product.categoryId);
        const priceInPaise = getEffectivePrice(product);
        return {
          productId: product.id,
          qty: line.qty,
          name: product.name,
          slug: product.slug,
          unit: product.unit,
          image: getProductImageSrc(product.images, category),
          priceInPaise,
          stock: product.stock,
          lineTotalInPaise: priceInPaise * line.qty,
        } satisfies CartItemView;
      })
      .filter((x): x is CartItemView => x !== null);
  }, [lines]);

  const subtotalInPaise = useMemo(() => items.reduce((sum, i) => sum + i.lineTotalInPaise, 0), [items]);

  return { items, subtotalInPaise, lines, ...cart };
}
