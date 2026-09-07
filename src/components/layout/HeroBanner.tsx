import Link from "next/link";
import Image from "next/image";
import { shopConfig } from "@/config/shop.config";
import { Button } from "@/components/ui/Button";
import { Clock, Truck } from "@/components/ui/icons";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-600">
      <div className="mx-auto grid max-w-7xl items-center gap-6 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16">
        <div className="relative z-10 text-white">
          <p className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Truck width={14} height={14} /> Delivering to your doorstep daily
          </p>
          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {shopConfig.tagline}
          </h1>
          <p className="mt-3 max-w-md text-sm text-brand-50 sm:text-base">
            Order everyday groceries, snacks, dairy &amp; household essentials from {shopConfig.name} — quality you trust, delivered fast.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products">
              <Button variant="secondary" size="lg">
                Shop Now
              </Button>
            </Link>
            <span className="flex items-center gap-1.5 text-sm text-brand-50">
              <Clock width={16} height={16} /> Avg. delivery in {shopConfig.estimatedDeliveryMinutes} mins
            </span>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-sm">
          <Image src="/images/hero-banner.svg" alt="Fresh groceries basket" fill priority className="object-contain drop-shadow-xl" />
        </div>
      </div>
    </section>
  );
}
