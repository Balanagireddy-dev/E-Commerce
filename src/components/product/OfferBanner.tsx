import type { Offer } from "@/types/product";

export function OfferBanner({ offer }: { offer: Offer }) {
  return (
    <div className="flex min-w-[260px] shrink-0 items-center gap-3 rounded-lg bg-gradient-to-br from-accent to-orange-400 p-4 text-white shadow-sm">
      <span className="text-3xl" aria-hidden>
        {offer.bannerEmoji}
      </span>
      <div>
        <p className="text-sm font-bold">{offer.title}</p>
        <p className="text-xs text-white/90">{offer.description}</p>
      </div>
    </div>
  );
}
