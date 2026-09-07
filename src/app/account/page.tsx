"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentCustomer } from "@/lib/data/customerService";
import { getAllOrders } from "@/lib/data/orderService";
import type { Customer } from "@/types/user";
import type { Order } from "@/types/order";
import { OrderCard } from "@/components/order/OrderCard";
import { Button } from "@/components/ui/Button";
import { User, MapPin, Phone, LogOut, Package } from "@/components/ui/icons";

export default function AccountPage() {
  const [customer, setCustomer] = useState<Customer | null | undefined>(undefined);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getCurrentCustomer().then(setCustomer);
    getAllOrders().then(setOrders);
  }, []);

  if (customer === undefined) return null;

  if (customer === null) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-20 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-alt dark:bg-surface-alt-dark text-brand-500">
          <User width={32} height={32} />
        </span>
        <h1 className="text-xl font-bold text-ink dark:text-ink-dark">No account yet</h1>
        <p className="text-sm text-ink-muted dark:text-ink-muted-dark">Place your first order and your profile will show up here.</p>
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
      <h1 className="mb-4 text-xl font-bold text-ink dark:text-ink-dark sm:text-2xl">My Account</h1>

      <section className="rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-700">
            {customer.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="font-semibold text-ink dark:text-ink-dark">{customer.name}</p>
            <p className="flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark">
              <Phone width={14} height={14} /> {customer.mobile}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
        <h2 className="mb-3 flex items-center gap-1.5 font-semibold text-ink dark:text-ink-dark">
          <MapPin width={18} height={18} /> Saved Addresses
        </h2>
        <ul className="flex flex-col gap-2">
          {customer.addresses.map((addr, idx) => (
            <li key={idx} className="rounded-md bg-surface-alt dark:bg-surface-alt-dark p-3 text-sm text-ink-soft dark:text-ink-soft-dark">
              {addr.addressLine}
              {addr.landmark ? `, ${addr.landmark}` : ""} — {addr.pincode}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4">
        <h2 className="mb-3 flex items-center gap-1.5 font-semibold text-ink dark:text-ink-dark">
          <Package width={18} height={18} /> Previous Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-sm text-ink-muted dark:text-ink-muted-dark">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </section>

      <Button
        variant="ghost"
        className="mt-6 text-danger"
        onClick={() => {
          window.localStorage.removeItem("kirana_customer_v1");
          setCustomer(null);
        }}
      >
        <LogOut width={18} height={18} /> Logout
      </Button>
    </div>
  );
}
