import Link from "next/link";
import type { Category } from "@/types/product";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="flex shrink-0 flex-col items-center gap-2 text-center"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-3xl shadow-sm sm:h-20 sm:w-20"
        style={{ background: `linear-gradient(135deg, ${category.colorFrom}, ${category.colorTo})` }}
        aria-hidden
      >
        {category.icon}
      </span>
      <span className="w-20 text-xs font-medium leading-tight text-ink-soft">{category.name}</span>
    </Link>
  );
}
