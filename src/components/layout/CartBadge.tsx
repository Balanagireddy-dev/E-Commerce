"use client";

import Link from "next/link";
import { ShoppingCart } from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";
import { clsx } from "@/lib/utils/clsx";

interface CartBadgeProps {
  variant?: "icon" | "full";
  onDark?: boolean;
}

export function CartBadge({ variant = "icon", onDark = false }: CartBadgeProps) {
  const { totalItemCount } = useCart();

  if (variant === "full") {
    return (
      <Link
        href="/cart"
        className={clsx(
          "relative flex h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold",
          onDark ? "bg-white text-brand-600 hover:bg-brand-50" : "bg-brand-600 text-white hover:bg-brand-700"
        )}
        aria-label={`Cart, ${totalItemCount} items`}
      >
        <ShoppingCart width={18} height={18} />
        Cart
        {totalItemCount > 0 ? (
          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-white">
            {totalItemCount}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <Link
      href="/cart"
      className={clsx(
        "relative flex h-10 w-10 items-center justify-center rounded-full",
        onDark ? "hover:bg-white/10" : "hover:bg-surface-alt hover:dark:bg-surface-alt-dark"
      )}
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
