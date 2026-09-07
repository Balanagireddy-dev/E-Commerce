import { Minus, Plus } from "./icons";
import { clsx } from "@/lib/utils/clsx";

export function QuantitySelector({
  qty,
  onIncrease,
  onDecrease,
  max,
  size = "md",
}: {
  qty: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
  size?: "sm" | "md";
}) {
  const dims = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const atMax = max !== undefined && qty >= max;

  return (
    <div
      className="inline-flex items-center rounded-lg border border-brand-500 bg-surface dark:bg-surface-dark overflow-hidden"
      role="group"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label="Decrease quantity"
        className={clsx(dims, "flex items-center justify-center text-brand-600 hover:bg-brand-50 active:bg-brand-100 transition-colors")}
      >
        <Minus />
      </button>
      <span className="min-w-[2rem] text-center text-sm font-semibold text-ink dark:text-ink-dark" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={atMax}
        aria-label="Increase quantity"
        className={clsx(
          dims,
          "flex items-center justify-center text-brand-600 hover:bg-brand-50 active:bg-brand-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      >
        <Plus />
      </button>
    </div>
  );
}
