import type { Customer } from "@/types/user";
import type { Address } from "@/types/order";
import { generateId } from "@/lib/utils/id";

const STORAGE_KEY = "kirana_customer_v1";

function read(): Customer | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Customer) : null;
  } catch {
    return null;
  }
}

function write(customer: Customer): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
}

export async function getCurrentCustomer(): Promise<Customer | null> {
  return read();
}

export async function upsertCustomer(data: { name: string; mobile: string; address: Address }): Promise<Customer> {
  const existing = read();
  const customer: Customer = existing
    ? {
        ...existing,
        name: data.name,
        mobile: data.mobile,
        addresses: existing.addresses.some((a) => a.addressLine === data.address.addressLine)
          ? existing.addresses
          : [...existing.addresses, data.address],
      }
    : {
        id: generateId("cust"),
        name: data.name,
        mobile: data.mobile,
        addresses: [data.address],
        createdAt: new Date().toISOString(),
      };
  write(customer);
  return customer;
}
