"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/lib/data/orderService";
import type { Order, OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/types/order";
import { OrderStatusBadge, ORDER_STATUS_TONE } from "@/components/order/OrderStatus";
import { formatPrice } from "@/lib/utils/price";
import { useToast } from "@/context/ToastContext";
import { clsx } from "@/lib/utils/clsx";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (order: Order, status: OrderStatus) => {
    const updated = await updateOrderStatus(order.id, status);
    if (!updated) return;
    setOrders((prev) => prev.map((o) => (o.id === order.id ? updated : o)));
    const paymentNote = updated.paymentStatus === "paid" && order.paymentStatus !== "paid" ? " and payment marked Paid" : "";
    showToast(`Order #${order.id} marked ${ORDER_STATUS_LABELS[status]}${paymentNote}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-ink dark:text-ink-dark sm:text-2xl">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-sm text-ink-muted dark:text-ink-muted-dark">No orders placed yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="border-b border-border dark:border-border-dark bg-surface-alt dark:bg-surface-alt-dark text-left text-xs uppercase text-ink-muted dark:text-ink-muted-dark">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-medium text-ink dark:text-ink-dark">#{order.id}</td>
                  <td className="px-4 py-3 text-ink-soft dark:text-ink-soft-dark">
                    {order.address.fullName}
                    <br />
                    <span className="text-xs text-ink-muted dark:text-ink-muted-dark">{order.address.mobile}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft dark:text-ink-soft-dark">{order.items.reduce((s, i) => s + i.qty, 0)} items</td>
                  <td className="px-4 py-3 font-semibold text-ink dark:text-ink-dark">{formatPrice(order.totalInPaise)}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="uppercase text-ink-soft dark:text-ink-soft-dark">{order.paymentMethod}</span>
                    <br />
                    <span className={order.paymentStatus === "paid" ? "font-semibold text-success" : "font-semibold text-warning"}>
                      {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      disabled={order.status === "delivered"}
                      onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                      className={clsx(
                        "h-9 rounded-md border-0 px-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                        ORDER_STATUS_TONE[order.status]
                      )}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {ORDER_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
