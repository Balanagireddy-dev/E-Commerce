export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "out_for_delivery",
  "delivered",
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export type PaymentMethod = "cod" | "online";

export type PaymentStatus = "paid" | "pending";

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  paid: "Paid",
  pending: "Pending",
};

export interface Address {
  fullName: string;
  mobile: string;
  addressLine: string;
  landmark?: string;
  pincode: string;
}

export interface OrderLineItem {
  productId: string;
  name: string;
  unit: string;
  qty: number;
  priceInPaise: number; // price at time of order
  image: string;
}

export interface Order {
  id: string;
  items: OrderLineItem[];
  address: Address;
  subtotalInPaise: number;
  deliveryChargeInPaise: number;
  totalInPaise: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string; // ISO date
  estimatedDeliveryMinutes: number;
}
