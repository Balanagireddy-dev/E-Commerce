"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "@/components/ui/icons";
import { clsx } from "@/lib/utils/clsx";

export function SearchBar({ size = "md", autoFocus = false }: { size?: "md" | "lg"; autoFocus?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams?.get("q") ?? "");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString());
    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} role="search" className="w-full">
      <label htmlFor="site-search" className="sr-only">
        Search for groceries, snacks, dairy and more
      </label>
      <div
        className={clsx(
          "flex items-center gap-2 rounded-full border border-border bg-surface px-4 shadow-sm",
          size === "lg" ? "h-14" : "h-11"
        )}
      >
        <Search className="text-ink-muted shrink-0" />
        <input
          id="site-search"
          type="search"
          autoFocus={autoFocus}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search for atta, rice, oil, biscuits..."
          className="h-full w-full bg-transparent text-base text-ink placeholder:text-ink-muted focus:outline-none"
        />
      </div>
    </form>
  );
}
