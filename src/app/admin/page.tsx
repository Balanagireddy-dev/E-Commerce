"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/lib/data/orderService";
import { getAllProductsSync } from "@/lib/data/productService";
import type { Order } from "@/types/order";
import { StatsCard } from "@/components/admin/StatsCard";
import { OrderStatusBadge } from "@/components/order/OrderStatus";
import { TrendingUp, Package, Box, AlertCircle } from "@/components/ui/icons";
import { formatPrice } from "@/lib/utils/price";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const products = getAllProductsSync();

  useEffect(() => {
    getAllOrders().then(setOrders);
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.totalInPaise, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "confirmed").length;
  const lowStockProducts = products.filter((p) => p.stock <= 15);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-ink sm:text-2xl">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard label="Total Revenue" value={formatPrice(totalRevenue)} icon={<TrendingUp width={20} height={20} />} tone="brand" />
        <StatsCard label="Total Orders" value={String(orders.length)} icon={<Package width={20} height={20} />} tone="accent" />
        <StatsCard label="Pending Orders" value={String(pendingOrders)} icon={<AlertCircle width={20} height={20} />} tone="warning" />
        <StatsCard label="Total Products" value={String(products.length)} icon={<Box width={20} height={20} />} tone="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-surface p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-ink">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              View all
            </Link>
          </div>
          {orders.length === 0 ? (
            <p className="text-sm text-ink-muted">No orders placed yet.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {orders.slice(0, 6).map((order) => (
                <li key={order.id} className="flex items-center justify-between py-2.5 text-sm">
                  <div>
                    <p className="font-medium text-ink">#{order.id}</p>
                    <p className="text-xs text-ink-muted">{order.address.fullName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-ink">{formatPrice(order.totalInPaise)}</span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="mb-3 font-semibold text-ink">Low Stock Alerts</h2>
          {lowStockProducts.length === 0 ? (
            <p className="text-sm text-ink-muted">All products are well stocked.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {lowStockProducts.slice(0, 6).map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="font-medium text-ink">{p.name}</span>
                  <span className="rounded-full bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning">
                    {p.stock} left
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
