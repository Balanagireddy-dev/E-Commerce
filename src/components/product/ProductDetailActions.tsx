"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/types/product";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

export function ProductDetailActions({ product }: { product: Product }) {
  const { getQty, addItem, increment, decrement } = useCart();
  const { showToast } = useToast();
  const router = useRouter();
  const [localQty, setLocalQty] = useState(1);
  const cartQty = getQty(product.id);
  const outOfStock = product.stock <= 0;

  if (outOfStock) {
    return (
      <Button size="lg" fullWidth disabled>
        Out of Stock
      </Button>
    );
  }

  if (cartQty > 0) {
    return (
      <div className="flex items-center gap-3">
        <QuantitySelector qty={cartQty} max={product.stock} onIncrease={() => increment(product.id)} onDecrease={() => decrement(product.id)} />
        <Button size="lg" className="flex-1" onClick={() => router.push("/checkout")}>
          Buy Now
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-ink-soft dark:text-ink-soft-dark">Qty</span>
        <QuantitySelector qty={localQty} max={product.stock} onIncrease={() => setLocalQty((q) => Math.min(q + 1, product.stock))} onDecrease={() => setLocalQty((q) => Math.max(1, q - 1))} />
      </div>
      <div className="flex flex-1 gap-3">
        <Button
          variant="outline"
          size="lg"
          className="flex-1"
          onClick={() => {
            addItem(product.id, localQty);
            showToast(`${product.name} added to cart`);
          }}
        >
          Add to Cart
        </Button>
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            addItem(product.id, localQty);
            router.push("/checkout");
          }}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
}
