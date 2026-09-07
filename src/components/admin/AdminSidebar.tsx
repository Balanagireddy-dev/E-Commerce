"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { TrendingUp, Box, Package, Users, Tag, LogOut } from "@/components/ui/icons";
import { clsx } from "@/lib/utils/clsx";
import { shopConfig } from "@/config/shop.config";

const links = [
  { href: "/admin", label: "Dashboard", icon: TrendingUp },
  { href: "/admin/products", label: "Products", icon: Box },
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/offers", label: "Offers", icon: Tag },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <aside className="flex w-full shrink-0 flex-row overflow-x-auto border-b border-border bg-surface md:h-screen md:w-60 md:flex-col md:overflow-visible md:border-b-0 md:border-r">
      <div className="hidden shrink-0 items-center gap-2 px-5 py-5 md:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
          {shopConfig.logoText}
        </span>
        <span className="font-bold text-ink">Admin Panel</span>
      </div>
      <nav className="flex flex-1 flex-row gap-1 p-2 md:flex-col md:p-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === "/admin" : pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-brand-600 text-white" : "text-ink-soft hover:bg-surface-alt"
              )}
            >
              <Icon width={18} height={18} />
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={logout}
        className="hidden shrink-0 items-center gap-2.5 px-5 py-4 text-sm font-medium text-danger hover:bg-danger/5 md:flex"
      >
        <LogOut width={18} height={18} /> Logout
      </button>
    </aside>
  );
}
