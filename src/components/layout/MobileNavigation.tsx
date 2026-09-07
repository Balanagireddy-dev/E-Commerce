"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid, ShoppingCart, User } from "@/components/ui/icons";
import { useCart } from "@/context/CartContext";
import { clsx } from "@/lib/utils/clsx";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Grid },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/account", label: "Account", icon: User },
];

export function MobileNavigation() {
  const pathname = usePathname();
  const { totalItemCount } = useCart();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 h-mobile-nav border-t border-border dark:border-border-dark bg-surface dark:bg-surface-dark pb-safe pt-1 md:hidden"
    >
      <ul className="grid h-full grid-cols-4">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname?.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "flex h-full flex-col items-center justify-center gap-0.5 text-xs font-medium",
                  active ? "text-brand-600" : "text-ink-muted dark:text-ink-muted-dark"
                )}
                aria-current={active ? "page" : undefined}
              >
                <span className="relative">
                  <Icon width={22} height={22} />
                  {href === "/cart" && totalItemCount > 0 ? (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                      {totalItemCount}
                    </span>
                  ) : null}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
