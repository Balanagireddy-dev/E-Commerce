"use client";

import Link from "next/link";
import { ShoppingCart } from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";

export function CartBadge({ variant = "icon" }: { variant?: "icon" | "full" }) {
  const { totalItemCount } = useCart();

  if (variant === "full") {
    return (
      <Link
        href="/cart"
        className="relative flex h-11 items-center gap-2 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white hover:bg-brand-700"
        aria-label={`Cart, ${totalItemCount} items`}
      >
        <ShoppingCart width={18} height={18} />
        Cart
        {totalItemCount > 0 ? (
          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-xs font-bold">
            {totalItemCount}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-alt"
      aria-label={`Cart, ${totalItemCount} items`}
    >
      <ShoppingCart />
      {totalItemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
          {totalItemCount}
        </span>
      ) : null}
    </Link>
  );
}
