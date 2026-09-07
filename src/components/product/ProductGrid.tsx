import type { Product, Category } from "@/types/product";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, categories }: { products: Product[]; categories: Category[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-16 text-center text-ink-muted dark:text-ink-muted-dark">
        <span className="text-4xl">🛒</span>
        <p className="font-medium text-ink dark:text-ink-dark">No products found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} category={categoryMap.get(product.categoryId)} />
      ))}
    </div>
  );
}
