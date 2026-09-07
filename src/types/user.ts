import type { Address } from "./order";

export interface Customer {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  addresses: Address[];
  createdAt: string;
}
