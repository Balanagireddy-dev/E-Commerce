import { formatPrice } from "@/lib/utils/price";
import { getShopSettings } from "@/lib/data/settingsService";

export function CartSummary({
  subtotalInPaise,
  deliveryChargeInPaise,
}: {
  subtotalInPaise: number;
  deliveryChargeInPaise: number;
}) {
  const total = subtotalInPaise + deliveryChargeInPaise;
  const remainingForFreeDelivery = getShopSettings().freeDeliveryThresholdInPaise - subtotalInPaise;

  return (
    <div className="rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark p-4">
      <h2 className="mb-3 font-semibold text-ink dark:text-ink-dark">Order Summary</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft dark:text-ink-soft-dark">Subtotal</dt>
          <dd className="font-medium text-ink dark:text-ink-dark">{formatPrice(subtotalInPaise)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft dark:text-ink-soft-dark">Delivery Charge</dt>
          <dd className="font-medium text-ink dark:text-ink-dark">
            {deliveryChargeInPaise === 0 ? <span className="text-success">FREE</span> : formatPrice(deliveryChargeInPaise)}
          </dd>
        </div>
        {remainingForFreeDelivery > 0 ? (
          <p className="rounded-md bg-brand-50 px-3 py-2 text-xs text-brand-700">
            Add {formatPrice(remainingForFreeDelivery)} more to get FREE delivery!
          </p>
        ) : null}
        <div className="flex justify-between border-t border-border dark:border-border-dark pt-2 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
