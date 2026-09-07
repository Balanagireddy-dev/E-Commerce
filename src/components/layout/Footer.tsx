import Link from "next/link";
import { shopConfig } from "@/config/shop.config";
import { MapPin, Phone, Clock } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="mt-12 block bg-brand-800 pb-24 md:pb-0">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="mb-2 text-lg font-bold text-white">{shopConfig.shortName}</h3>
          <p className="text-sm text-brand-100">{shopConfig.tagline}</p>
        </div>
        <div className="text-sm text-brand-100 space-y-2">
          <p className="flex items-start gap-2">
            <MapPin width={16} height={16} className="mt-0.5 shrink-0" /> {shopConfig.address}
          </p>
          <p className="flex items-center gap-2">
            <Phone width={16} height={16} /> {shopConfig.phone}
          </p>
          <p className="flex items-center gap-2">
            <Clock width={16} height={16} /> {shopConfig.storeHours}
          </p>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-1.5 text-brand-100">
            <li><Link href="/products" className="hover:text-white">Shop All Products</Link></li>
            <li><Link href="/products?max=5000" className="hover:text-white">Items Under ₹50</Link></li>
            <li><Link href="/account" className="hover:text-white">My Account</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin Dashboard</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-700 py-4 text-center text-xs text-brand-100">
        © {new Date().getFullYear()} {shopConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
