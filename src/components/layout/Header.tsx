import Link from "next/link";
import { Suspense } from "react";
import { SearchBar } from "./SearchBar";
import { CartBadge } from "./CartBadge";
import { shopConfig } from "@/config/shop.config";
import { User } from "@/components/ui/icons";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-[var(--header-height)] max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-ink">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm text-white">
            {shopConfig.logoText}
          </span>
          <span className="hidden text-base sm:inline">{shopConfig.shortName}</span>
        </Link>

        <div className="hidden flex-1 md:block">
          <Suspense fallback={<div className="h-11 rounded-full bg-surface-alt" />}>
            <SearchBar />
          </Suspense>
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link href="/products" className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-surface-alt">
            Shop
          </Link>
          <Link href="/account" className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-surface-alt">
            <User width={18} height={18} /> Account
          </Link>
          <CartBadge variant="full" />
        </nav>

        <div className="ml-auto flex items-center gap-1 md:hidden">
          <CartBadge />
        </div>
      </div>

      <div className="border-t border-border px-4 pb-3 pt-2 md:hidden">
        <Suspense fallback={<div className="h-11 rounded-full bg-surface-alt" />}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  );
}
