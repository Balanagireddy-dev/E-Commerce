import Link from "next/link";
import type { Order } from "@/types/order";
import { PAYMENT_STATUS_LABELS } from "@/types/order";
import { OrderStatusBadge } from "./OrderStatus";
import { formatPrice } from "@/lib/utils/price";
import { Package, ChevronRight } from "@/components/ui/icons";
import { clsx } from "@/lib/utils/clsx";

export function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.createdAt);
  const itemCount = order.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <Link
      href={`/order-confirmation/${order.id}`}
      className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 hover:shadow-md transition-shadow"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
        <Package width={20} height={20} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-ink truncate">Order #{order.id}</p>
          <OrderStatusBadge status={order.status} />
        </div>
        <p className="text-sm text-ink-muted">
          {itemCount} item{itemCount > 1 ? "s" : ""} · {date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
        <p className="flex items-center gap-2 text-sm font-semibold text-ink">
          {formatPrice(order.totalInPaise)}
          <span
            className={clsx(
              "text-xs font-medium",
              order.paymentStatus === "paid" ? "text-success" : "text-warning"
            )}
          >
            · Payment {PAYMENT_STATUS_LABELS[order.paymentStatus]}
          </span>
        </p>
      </div>
      <ChevronRight className="text-ink-muted shrink-0" />
    </Link>
  );
}
