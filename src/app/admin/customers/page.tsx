"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/lib/data/orderService";
import type { Order } from "@/types/order";
import { formatPrice } from "@/lib/utils/price";
import { Users } from "@/components/ui/icons";

interface CustomerSummary {
  name: string;
  mobile: string;
  orderCount: number;
  totalSpentInPaise: number;
  lastOrderAt: string;
}

export default function AdminCustomersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  const customers: CustomerSummary[] = Object.values(
    orders.reduce<Record<string, CustomerSummary>>((acc, order) => {
      const key = order.address.mobile;
      if (!acc[key]) {
        acc[key] = { name: order.address.fullName, mobile: key, orderCount: 0, totalSpentInPaise: 0, lastOrderAt: order.createdAt };
      }
      acc[key].orderCount += 1;
      acc[key].totalSpentInPaise += order.totalInPaise;
      if (order.createdAt > acc[key].lastOrderAt) acc[key].lastOrderAt = order.createdAt;
      return acc;
    }, {})
  ).sort((a, b) => b.totalSpentInPaise - a.totalSpentInPaise);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold text-ink dark:text-ink-dark sm:text-2xl">Customers</h1>

      {customers.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark py-16 text-center text-ink-muted dark:text-ink-muted-dark">
          <Users width={32} height={32} />
          <p>No customers yet — they will appear here after the first order.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="border-b border-border dark:border-border-dark bg-surface-alt dark:bg-surface-alt-dark text-left text-xs uppercase text-ink-muted dark:text-ink-muted-dark">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Mobile</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Total Spent</th>
                <th className="px-4 py-3">Last Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {customers.map((c) => (
                <tr key={c.mobile}>
                  <td className="px-4 py-3 font-medium text-ink dark:text-ink-dark">{c.name}</td>
                  <td className="px-4 py-3 text-ink-soft dark:text-ink-soft-dark">{c.mobile}</td>
                  <td className="px-4 py-3 text-ink-soft dark:text-ink-soft-dark">{c.orderCount}</td>
                  <td className="px-4 py-3 font-semibold text-ink dark:text-ink-dark">{formatPrice(c.totalSpentInPaise)}</td>
                  <td className="px-4 py-3 text-ink-soft dark:text-ink-soft-dark">
                    {new Date(c.lastOrderAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
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
