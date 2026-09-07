"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartItems } from "@/lib/hooks/useCartItems";
import { CheckoutForm } from "@/components/order/CheckoutForm";
import { CartSummary } from "@/components/cart/CartSummary";
import { shopConfig } from "@/config/shop.config";
import { getShopSettings } from "@/lib/data/settingsService";
import { calculateDeliveryCharge } from "@/lib/utils/price";
import { createOrder } from "@/lib/data/orderService";
import { upsertCustomer } from "@/lib/data/customerService";
import { generateId } from "@/lib/utils/id";
import type { CheckoutFormValues } from "@/lib/utils/validation";
import type { Order, PaymentMethod } from "@/types/order";

export default function CheckoutPage() {
  const { items, subtotalInPaise, clearCart } = useCartItems();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const settings = getShopSettings();

  const deliveryCharge = calculateDeliveryCharge(
    subtotalInPaise,
    settings.deliveryChargeInPaise,
    settings.freeDeliveryThresholdInPaise
  );

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready && items.length === 0) {
      router.replace("/cart");
    }
  }, [ready, items.length, router]);

  const handleSubmit = async (values: CheckoutFormValues, paymentMethod: PaymentMethod) => {
    setSubmitting(true);
    const order: Order = {
      id: generateId("ORD").toUpperCase(),
      items: items.map((i) => ({
        productId: i.productId,
        name: i.name,
        unit: i.unit,
        qty: i.qty,
        priceInPaise: i.priceInPaise,
        image: i.image,
      })),
      address: {
        fullName: values.fullName,
        mobile: values.mobile,
        addressLine: values.addressLine,
        landmark: values.landmark || undefined,
        pincode: values.pincode,
      },
      subtotalInPaise,
      deliveryChargeInPaise: deliveryCharge,
      totalInPaise: subtotalInPaise + deliveryCharge,
      paymentMethod,
      paymentStatus: paymentMethod === "online" ? "paid" : "pending",
      status: "pending",
      createdAt: new Date().toISOString(),
      estimatedDeliveryMinutes: shopConfig.estimatedDeliveryMinutes,
    };

    await createOrder(order);
    await upsertCustomer({
      name: values.fullName,
      mobile: values.mobile,
      address: {
        fullName: values.fullName,
        mobile: values.mobile,
        addressLine: values.addressLine,
        landmark: values.landmark || undefined,
        pincode: values.pincode,
      },
    });

    clearCart();
    router.push(`/order-confirmation/${order.id}`);
  };

  if (!ready || items.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <h1 className="mb-4 text-xl font-bold text-ink sm:text-2xl">Checkout</h1>
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <CheckoutForm onSubmit={handleSubmit} submitting={submitting} />
        </div>
        <div className="w-full shrink-0 md:w-80">
          <CartSummary subtotalInPaise={subtotalInPaise} deliveryChargeInPaise={deliveryCharge} />
        </div>
      </div>
    </div>
  );
}
