import { HTMLAttributes } from "react";
import { clsx } from "@/lib/utils/clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("rounded-lg border border-border bg-surface shadow-sm", className)}
      {...props}
    />
  );
}
