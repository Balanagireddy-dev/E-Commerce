import { Badge } from "./Badge";
import { getDiscountPercent } from "@/lib/utils/price";

export function DiscountBadge({ mrpInPaise, sellingInPaise }: { mrpInPaise: number; sellingInPaise: number }) {
  const percent = getDiscountPercent(mrpInPaise, sellingInPaise);
  if (percent <= 0) return null;
  return <Badge tone="accent">{percent}% OFF</Badge>;
}
