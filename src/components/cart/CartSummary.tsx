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
    <div className="rounded-lg border border-border bg-surface p-4">
      <h2 className="mb-3 font-semibold text-ink">Order Summary</h2>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="font-medium text-ink">{formatPrice(subtotalInPaise)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">Delivery Charge</dt>
          <dd className="font-medium text-ink">
            {deliveryChargeInPaise === 0 ? <span className="text-success">FREE</span> : formatPrice(deliveryChargeInPaise)}
          </dd>
        </div>
        {remainingForFreeDelivery > 0 ? (
          <p className="rounded-md bg-brand-50 px-3 py-2 text-xs text-brand-700">
            Add {formatPrice(remainingForFreeDelivery)} more to get FREE delivery!
          </p>
        ) : null}
        <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
          <dt>Total</dt>
          <dd>{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
