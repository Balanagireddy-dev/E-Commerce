import Link from "next/link";
import type { Product, Category } from "@/types/product";
import { ProductCard } from "./ProductCard";
import { ChevronRight } from "@/components/ui/icons";

export function ProductRail({
  title,
  products,
  categories,
  viewAllHref,
}: {
  title: string;
  products: Product[];
  categories: Category[];
  viewAllHref?: string;
}) {
  if (products.length === 0) return null;
  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink dark:text-ink-dark sm:text-xl">{title}</h2>
        {viewAllHref ? (
          <Link href={viewAllHref} className="flex items-center text-sm font-medium text-brand-600 hover:text-brand-700">
            View all <ChevronRight width={16} height={16} />
          </Link>
        ) : null}
      </div>
      <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <div key={product.id} className="w-40 shrink-0 sm:w-auto">
            <ProductCard product={product} category={categoryMap.get(product.categoryId)} />
          </div>
        ))}
      </div>
    </section>
  );
}
