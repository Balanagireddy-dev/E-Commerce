"use client";

import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Trash } from "@/components/ui/icons";
import type { CartItemView } from "@/types/cart";
import { useCart } from "@/context/CartContext";

export function CartItem({ item }: { item: CartItemView }) {
  const { increment, decrement, removeItem } = useCart();

  return (
    <div className="flex gap-3 border-b border-border py-4 last:border-b-0">
      <Link href={`/products/${item.slug}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-surface-alt">
        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/products/${item.slug}`} className="text-sm font-medium text-ink hover:text-brand-700 line-clamp-2">
            {item.name}
          </Link>
          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            aria-label={`Remove ${item.name} from cart`}
            className="shrink-0 rounded-full p-1.5 text-ink-muted hover:bg-surface-alt hover:text-danger"
          >
            <Trash width={18} height={18} />
          </button>
        </div>
        <span className="text-xs text-ink-muted">{item.unit}</span>

        <div className="mt-auto flex items-center justify-between pt-1">
          <QuantitySelector
            qty={item.qty}
            max={item.stock}
            size="sm"
            onIncrease={() => increment(item.productId)}
            onDecrease={() => decrement(item.productId)}
          />
          <PriceDisplay priceInPaise={item.lineTotalInPaise} size="sm" />
        </div>
      </div>
    </div>
  );
}
