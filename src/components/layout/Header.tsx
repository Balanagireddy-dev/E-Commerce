"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchBar } from "./SearchBar";
import { CartBadge } from "./CartBadge";
import { shopConfig } from "@/config/shop.config";
import { User, Sun, Moon } from "@/components/ui/icons";
import { clsx } from "@/lib/utils/clsx";
import { useTheme } from "@/context/ThemeContext";

const SCROLL_THRESHOLD = 40;

function ThemeToggle({ onDark }: { onDark: boolean }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={clsx(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        onDark ? "hover:bg-white/10" : "hover:bg-surface-alt hover:dark:bg-surface-alt-dark"
      )}
    >
      {theme === "dark" ? <Sun width={18} height={18} /> : <Moon width={18} height={18} />}
    </button>
  );
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, [pathname]);

  const greenHeader = isHome && scrolled;

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 transition-colors duration-200",
        greenHeader ? "bg-brand-600" : "border-b border-border dark:border-border-dark bg-surface dark:bg-surface-dark"
      )}
    >
      <div className="mx-auto flex h-header max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className={clsx("flex shrink-0 items-center gap-2 font-bold", greenHeader ? "text-white" : "text-ink dark:text-ink-dark")}>
          <span
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-full text-sm",
              greenHeader ? "bg-white text-brand-600" : "bg-brand-600 text-white"
            )}
          >
            {shopConfig.logoText}
          </span>
          <span className={clsx("text-base", greenHeader ? "text-white" : "text-brand-600")}>
            {shopConfig.shortName}
          </span>
        </Link>

        <div className="hidden flex-1 md:block">
          <Suspense fallback={<div className="h-11 rounded-full bg-surface-alt dark:bg-surface-alt-dark" />}>
            <SearchBar />
          </Suspense>
        </div>

        <nav className="ml-auto hidden items-center gap-1 md:flex">
          <Link
            href="/products"
            className={clsx(
              "rounded-full px-4 py-2 text-sm font-medium",
              greenHeader ? "text-white hover:bg-white/10" : "text-ink-soft dark:text-ink-soft-dark hover:bg-surface-alt hover:dark:bg-surface-alt-dark"
            )}
          >
            Shop
          </Link>
          <Link
            href="/account"
            className={clsx(
              "flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium",
              greenHeader ? "text-white hover:bg-white/10" : "text-ink-soft dark:text-ink-soft-dark hover:bg-surface-alt hover:dark:bg-surface-alt-dark"
            )}
          >
            <User width={18} height={18} /> Account
          </Link>
          <ThemeToggle onDark={greenHeader} />
          <CartBadge variant="full" onDark={greenHeader} />
        </nav>

        <div className={clsx("ml-auto flex items-center gap-1 md:hidden", greenHeader ? "text-white" : "text-ink dark:text-ink-dark")}>
          <ThemeToggle onDark={greenHeader} />
          <CartBadge onDark={greenHeader} />
        </div>
      </div>

      <div className={clsx("border-t px-4 pb-3 pt-2 md:hidden", greenHeader ? "border-white/20" : "border-border dark:border-border-dark")}>
        <Suspense fallback={<div className="h-11 rounded-full bg-surface-alt dark:bg-surface-alt-dark" />}>
          <SearchBar />
        </Suspense>
      </div>
    </header>
  );
}
