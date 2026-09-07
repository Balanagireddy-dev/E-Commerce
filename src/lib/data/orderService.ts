import type { Order, OrderStatus } from "@/types/order";

/**
 * Order data-access layer. Persists to localStorage for this mock/local-data
 * phase; swap the implementation for REST/GraphQL/Firebase/Supabase calls
 * later without changing any component that imports this module.
 */
const STORAGE_KEY = "kirana_orders_v1";

function readAll(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeAll(orders: Order[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export async function getAllOrders(): Promise<Order[]> {
  return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return readAll().find((o) => o.id === id);
}

export async function createOrder(order: Order): Promise<Order> {
  const all = readAll();
  writeAll([order, ...all]);
  return order;
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | undefined> {
  const all = readAll();
  let updated: Order | undefined;
  const next = all.map((o) => {
    if (o.id === id) {
      updated = { ...o, status };
      return updated;
    }
    return o;
  });
  writeAll(next);
  return updated;
}
