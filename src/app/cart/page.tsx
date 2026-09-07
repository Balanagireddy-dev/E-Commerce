"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartItems } from "@/lib/hooks/useCartItems";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";
import { ShoppingCart } from "@/components/ui/icons";
import { getShopSettings } from "@/lib/data/settingsService";
import { calculateDeliveryCharge } from "@/lib/utils/price";

export default function CartPage() {
  const { items, subtotalInPaise } = useCartItems();
  const router = useRouter();
  const settings = getShopSettings();

  const deliveryCharge = calculateDeliveryCharge(
    subtotalInPaise,
    settings.deliveryChargeInPaise,
    settings.freeDeliveryThresholdInPaise
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-alt dark:bg-surface-alt-dark text-brand-500">
          <ShoppingCart width={36} height={36} />
        </span>
        <h1 className="text-xl font-bold text-ink dark:text-ink-dark">Your cart is empty</h1>
        <p className="text-sm text-ink-muted dark:text-ink-muted-dark">Add some fresh groceries to get started!</p>
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <h1 className="mb-4 text-xl font-bold text-ink dark:text-ink-dark sm:text-2xl">Your Cart</h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
          {items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="w-full shrink-0 md:w-80">
          <CartSummary subtotalInPaise={subtotalInPaise} deliveryChargeInPaise={deliveryCharge} />

          <Button size="lg" fullWidth className="mt-4" onClick={() => router.push("/checkout")}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
