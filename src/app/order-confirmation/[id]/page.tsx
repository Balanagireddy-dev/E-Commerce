"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getOrderById } from "@/lib/data/orderService";
import type { Order } from "@/types/order";
import { CheckCircle, Clock, MapPin } from "@/components/ui/icons";
import { Button } from "@/components/ui/Button";
import { OrderStatusTracker, PaymentStatusBadge } from "@/components/order/OrderStatus";
import { formatPrice } from "@/lib/utils/price";

export default function OrderConfirmationPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    getOrderById(params.id).then((o) => setOrder(o ?? null));
  }, [params.id]);

  if (order === undefined) return null;

  if (order === null) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-lg font-semibold text-ink dark:text-ink-dark">Order not found</p>
        <Button className="mt-4" onClick={() => router.push("/products")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <CheckCircle width={32} height={32} />
        </span>
        <h1 className="text-2xl font-bold text-ink dark:text-ink-dark">Order Placed Successfully!</h1>
        <p className="text-sm text-ink-muted dark:text-ink-muted-dark">Order #{order.id}</p>
        <p className="flex items-center gap-1.5 text-sm text-ink-soft dark:text-ink-soft-dark">
          <Clock width={16} height={16} /> Estimated delivery in {order.estimatedDeliveryMinutes} minutes
        </p>
        <PaymentStatusBadge status={order.paymentStatus} method={order.paymentMethod} />
      </div>

      <div className="mt-6 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
        <h2 className="mb-3 font-semibold text-ink dark:text-ink-dark">Order Status</h2>
        <OrderStatusTracker status={order.status} />
      </div>

      <div className="mt-4 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
        <h2 className="mb-3 font-semibold text-ink dark:text-ink-dark">Items Ordered</h2>
        <ul className="flex flex-col divide-y divide-border">
          {order.items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3 py-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-alt dark:bg-surface-alt-dark">
                <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-ink dark:text-ink-dark">{item.name}</p>
                <p className="text-xs text-ink-muted dark:text-ink-muted-dark">{item.unit} × {item.qty}</p>
              </div>
              <p className="text-sm font-semibold text-ink dark:text-ink-dark">{formatPrice(item.priceInPaise * item.qty)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1.5 border-t border-border dark:border-border-dark pt-3 text-sm">
          <div className="flex justify-between text-ink-soft dark:text-ink-soft-dark">
            <dt>Subtotal</dt>
            <dd>{formatPrice(order.subtotalInPaise)}</dd>
          </div>
          <div className="flex justify-between text-ink-soft dark:text-ink-soft-dark">
            <dt>Delivery Charge</dt>
            <dd>{order.deliveryChargeInPaise === 0 ? "FREE" : formatPrice(order.deliveryChargeInPaise)}</dd>
          </div>
          <div className="flex justify-between text-base font-bold text-ink dark:text-ink-dark">
            <dt>Total</dt>
            <dd>{formatPrice(order.totalInPaise)}</dd>
          </div>
          <div className="flex items-center justify-between border-t border-border dark:border-border-dark pt-2 text-ink-soft dark:text-ink-soft-dark">
            <dt>Payment Method</dt>
            <dd className="font-medium text-ink dark:text-ink-dark">{order.paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-soft dark:text-ink-soft-dark">Payment Status</dt>
            <dd>
              <PaymentStatusBadge status={order.paymentStatus} method={order.paymentMethod} />
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-4 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
        <h2 className="mb-2 flex items-center gap-1.5 font-semibold text-ink dark:text-ink-dark">
          <MapPin width={18} height={18} /> Delivery Address
        </h2>
        <p className="text-sm text-ink-soft dark:text-ink-soft-dark">
          {order.address.fullName}, {order.address.mobile}
          <br />
          {order.address.addressLine}
          {order.address.landmark ? `, ${order.address.landmark}` : ""}
          <br />
          Pincode: {order.address.pincode}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link href="/products" className="flex-1">
          <Button variant="outline" size="lg" fullWidth>
            Continue Shopping
          </Button>
        </Link>
        <Link href="/account" className="flex-1">
          <Button size="lg" fullWidth>
            View My Orders
          </Button>
        </Link>
      </div>
    </div>
  );
}
