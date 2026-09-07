import { ORDER_STATUS_LABELS, ORDER_STATUS_SEQUENCE, PAYMENT_STATUS_LABELS, type OrderStatus as OrderStatusType, type PaymentStatus, type PaymentMethod } from "@/types/order";
import { Check, X, Clock, CheckCircle } from "@/components/ui/icons";
import { clsx } from "@/lib/utils/clsx";

/** One color per order status, reused by the status badge and the admin status picker. */
export const ORDER_STATUS_TONE: Record<OrderStatusType, string> = {
  pending: "bg-warning/15 text-warning",
  confirmed: "bg-info/15 text-info",
  preparing: "bg-accent/15 text-accent",
  out_for_delivery: "bg-transit/15 text-transit",
  delivered: "bg-success/15 text-success",
  cancelled: "bg-danger/15 text-danger",
};

export function PaymentStatusBadge({ status, method }: { status: PaymentStatus; method: PaymentMethod }) {
  const isPaid = status === "paid";
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold",
        isPaid ? "bg-success/10 text-success" : "bg-warning/15 text-warning"
      )}
    >
      {isPaid ? <CheckCircle width={16} height={16} /> : <Clock width={16} height={16} />}
      Payment {PAYMENT_STATUS_LABELS[status]}
      {!isPaid && method === "cod" ? " (Pay on Delivery)" : null}
    </span>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatusType }) {
  return (
    <span className={clsx("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", ORDER_STATUS_TONE[status])}>
      {ORDER_STATUS_LABELS[status]}
    </span>
  );
}

export function OrderStatusTracker({ status }: { status: OrderStatusType }) {
  if (status === "cancelled") {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-danger/10 px-4 py-3 text-danger">
        <X width={18} height={18} />
        <span className="text-sm font-semibold">This order has been cancelled</span>
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_SEQUENCE.indexOf(status);

  return (
    <ol className="flex flex-col gap-0">
      {ORDER_STATUS_SEQUENCE.map((step, index) => {
        const done = index <= currentIndex;
        const isLast = index === ORDER_STATUS_SEQUENCE.length - 1;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={clsx(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2",
                  done ? "border-brand-600 bg-brand-600 text-white" : "border-border dark:border-border-dark bg-surface dark:bg-surface-dark text-ink-muted dark:text-ink-muted-dark"
                )}
              >
                {done ? <Check width={14} height={14} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              {!isLast ? <span className={clsx("w-0.5 flex-1 min-h-[24px]", done ? "bg-brand-600" : "bg-border")} /> : null}
            </div>
            <div className="pb-6">
              <p className={clsx("text-sm font-semibold", done ? "text-ink dark:text-ink-dark" : "text-ink-muted dark:text-ink-muted-dark")}>
                {ORDER_STATUS_LABELS[step]}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
