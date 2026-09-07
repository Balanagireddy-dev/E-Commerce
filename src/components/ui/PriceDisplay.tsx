import { formatPrice } from "@/lib/utils/price";
import { clsx } from "@/lib/utils/clsx";

export function PriceDisplay({
  priceInPaise,
  mrpInPaise,
  size = "md",
  className,
}: {
  priceInPaise: number;
  mrpInPaise?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const hasDiscount = !!mrpInPaise && mrpInPaise > priceInPaise;
  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <div className={clsx("flex items-baseline gap-2 flex-wrap", className)}>
      <span className={clsx("font-bold text-ink dark:text-ink-dark", sizeClasses)}>{formatPrice(priceInPaise)}</span>
      {hasDiscount ? (
        <span className="text-sm text-ink-muted dark:text-ink-muted-dark line-through">{formatPrice(mrpInPaise!)}</span>
      ) : null}
    </div>
  );
}
