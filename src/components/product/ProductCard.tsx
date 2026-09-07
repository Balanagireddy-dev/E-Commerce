"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product, Category } from "@/types/product";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { DiscountBadge } from "@/components/ui/DiscountBadge";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getEffectivePrice } from "@/lib/utils/price";
import { getProductImageSrc } from "@/lib/utils/image";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export function ProductCard({ product, category }: { product: Product; category?: Category }) {
  const { getQty, addItem, increment, decrement } = useCart();
  const { showToast } = useToast();
  const qty = getQty(product.id);
  const price = getEffectivePrice(product);
  const image = getProductImageSrc(product.images, category);
  const outOfStock = product.stock <= 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark shadow-sm transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative block aspect-square bg-surface-alt dark:bg-surface-alt-dark">
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px"
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {product.discountPriceInPaise ? (
            <DiscountBadge mrpInPaise={product.priceInPaise} sellingInPaise={product.discountPriceInPaise} />
          ) : null}
          {product.isNew ? <Badge tone="brand">NEW</Badge> : null}
        </div>
        {outOfStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/80">
            <Badge tone="danger">Out of stock</Badge>
          </div>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Link href={`/products/${product.slug}`} className="line-clamp-2 text-sm font-medium text-ink dark:text-ink-dark hover:text-brand-700">
          {product.name}
        </Link>
        <span className="text-xs text-ink-muted dark:text-ink-muted-dark">{product.unit}</span>
        <PriceDisplay priceInPaise={price} mrpInPaise={product.discountPriceInPaise ? product.priceInPaise : undefined} size="sm" />

        <div className="mt-auto pt-2">
          {qty === 0 ? (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              disabled={outOfStock}
              onClick={() => {
                addItem(product.id, 1);
                showToast(`${product.name} added to cart`);
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <QuantitySelector
              qty={qty}
              max={product.stock}
              onIncrease={() => increment(product.id)}
              onDecrease={() => decrement(product.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
