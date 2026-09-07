import { HTMLAttributes } from "react";
import { clsx } from "@/lib/utils/clsx";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx("rounded-lg border border-border dark:border-border-dark bg-surface dark:bg-surface-dark shadow-sm", className)}
      {...props}
    />
  );
}
