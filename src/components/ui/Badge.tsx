import { ReactNode } from "react";
import { clsx } from "@/lib/utils/clsx";

export type BadgeTone = "brand" | "accent" | "success" | "danger" | "warning" | "neutral";

const toneClasses: Record<BadgeTone, string> = {
  brand: "bg-brand-100 text-brand-700",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  danger: "bg-danger/10 text-danger",
  warning: "bg-warning/15 text-warning",
  neutral: "bg-surface-alt dark:bg-surface-alt-dark text-ink-soft dark:text-ink-soft-dark border border-border dark:border-border-dark",
};

export function Badge({ tone = "neutral", children, className }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
