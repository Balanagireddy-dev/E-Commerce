"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import type { Category } from "@/types/product";
import { clsx } from "@/lib/utils/clsx";
import { Filter } from "@/components/ui/icons";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "popular", label: "Popularity" },
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
];

const PRICE_RANGES = [
  { label: "Under ₹50", min: 0, max: 5000 },
  { label: "₹50 - ₹150", min: 5000, max: 15000 },
  { label: "₹150 - ₹500", min: 15000, max: 50000 },
  { label: "Above ₹500", min: 50000, max: undefined },
];

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeCategory = searchParams.get("category") ?? "";
  const activeSort = searchParams.get("sort") ?? "popular";
  const activeMin = searchParams.get("min");
  const activeMax = searchParams.get("max");

  const updateParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const setPriceRange = (min?: number, max?: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (min !== undefined) params.set("min", String(min));
    else params.delete("min");
    if (max !== undefined) params.set("max", String(max));
    else params.delete("max");
    router.push(`${pathname}?${params.toString()}`);
  };

  const content = (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink">Sort By</h3>
        <div className="flex flex-col gap-1">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("sort", opt.value)}
              className={clsx(
                "rounded-md px-3 py-2 text-left text-sm",
                activeSort === opt.value ? "bg-brand-50 font-semibold text-brand-700" : "text-ink-soft hover:bg-surface-alt"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink">Category</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => updateParam("category", undefined)}
            className={clsx(
              "rounded-md px-3 py-2 text-left text-sm",
              !activeCategory ? "bg-brand-50 font-semibold text-brand-700" : "text-ink-soft hover:bg-surface-alt"
            )}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => updateParam("category", c.slug)}
              className={clsx(
                "rounded-md px-3 py-2 text-left text-sm",
                activeCategory === c.slug ? "bg-brand-50 font-semibold text-brand-700" : "text-ink-soft hover:bg-surface-alt"
              )}
            >
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-ink">Price</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setPriceRange(undefined, undefined)}
            className={clsx(
              "rounded-md px-3 py-2 text-left text-sm",
              !activeMin && !activeMax ? "bg-brand-50 font-semibold text-brand-700" : "text-ink-soft hover:bg-surface-alt"
            )}
          >
            Any Price
          </button>
          {PRICE_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() => setPriceRange(range.min, range.max)}
              className={clsx(
                "rounded-md px-3 py-2 text-left text-sm",
                Number(activeMin) === range.min && (range.max ? Number(activeMax) === range.max : !activeMax)
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-ink-soft hover:bg-surface-alt"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="mb-4 flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink lg:hidden"
      >
        <Filter width={16} height={16} /> Filters &amp; Sort
      </button>

      <aside className="hidden w-56 shrink-0 lg:block">{content}</aside>

      <Modal open={mobileOpen} onClose={() => setMobileOpen(false)} title="Filters & Sort">
        {content}
        <Button fullWidth className="mt-4" onClick={() => setMobileOpen(false)}>
          Show Results
        </Button>
      </Modal>
    </>
  );
}
