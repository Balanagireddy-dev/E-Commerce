import { ReactNode } from "react";
import { clsx } from "@/lib/utils/clsx";

export function StatsCard({
  label,
  value,
  icon,
  tone = "brand",
}: {
  label: string;
  value: string;
  icon: ReactNode;
  tone?: "brand" | "accent" | "success" | "warning";
}) {
  const toneClasses = {
    brand: "bg-brand-100 text-brand-700",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning",
  }[tone];

  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4">
      <span className={clsx("flex h-11 w-11 shrink-0 items-center justify-center rounded-full", toneClasses)}>{icon}</span>
      <div>
        <p className="text-xs font-medium text-ink-muted">{label}</p>
        <p className="text-xl font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}
