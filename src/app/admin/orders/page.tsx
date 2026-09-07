"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/lib/data/orderService";
import type { Order, OrderStatus } from "@/types/order";
import { ORDER_STATUS_LABELS, PAYMENT_STATUS_LABELS } from "@/types/order";
import { OrderStatusBadge } from "@/components/order/OrderStatus";
import { formatPrice } from "@/lib/utils/price";
import { useToast } from "@/context/ToastContext";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  const handleStatusChange = async (order: Order, status: OrderStatus) => {
    await updateOrderStatus(order.id, status);
    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
    showToast(`Order #${order.id} marked ${ORDER_STATUS_LABELS[status]}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-ink sm:text-2xl">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-sm text-ink-muted">No orders placed yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="border-b border-border bg-surface-alt text-left text-xs uppercase text-ink-muted">
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
                  <td className="px-4 py-3 font-medium text-ink">#{order.id}</td>
                  <td className="px-4 py-3 text-ink-soft">
                    {order.address.fullName}
                    <br />
                    <span className="text-xs text-ink-muted">{order.address.mobile}</span>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">{order.items.reduce((s, i) => s + i.qty, 0)} items</td>
                  <td className="px-4 py-3 font-semibold text-ink">{formatPrice(order.totalInPaise)}</td>
                  <td className="px-4 py-3 text-xs">
                    <span className="uppercase text-ink-soft">{order.paymentMethod}</span>
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
                      onChange={(e) => handleStatusChange(order, e.target.value as OrderStatus)}
                      className="h-9 rounded-md border border-border bg-surface px-2 text-sm text-ink"
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
