import { Suspense } from "react";
import type { Metadata } from "next";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters } from "@/components/product/ProductFilters";
import { getAllCategories, getCategoryBySlug, filterProducts, type ProductFilters as Filters } from "@/lib/data/productService";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse groceries, snacks, dairy, and daily essentials. Filter by category and price, sort by popularity or newest.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const categories = await getAllCategories();
  const categoryFilter = searchParams.category ? await getCategoryBySlug(searchParams.category) : undefined;

  const filters: Filters = {
    categoryId: categoryFilter?.id,
    query: searchParams.q,
    minPriceInPaise: searchParams.min ? Number(searchParams.min) : undefined,
    maxPriceInPaise: searchParams.max ? Number(searchParams.max) : undefined,
    sortBy: (searchParams.sort as Filters["sortBy"]) ?? "popular",
  };

  const products = await filterProducts(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <h1 className="mb-1 text-xl font-bold text-ink dark:text-ink-dark sm:text-2xl">
        {categoryFilter ? categoryFilter.name : searchParams.q ? `Results for "${searchParams.q}"` : "All Products"}
      </h1>
      <p className="mb-4 text-sm text-ink-muted dark:text-ink-muted-dark">{products.length} products found</p>

      <div className="flex flex-col gap-6 lg:flex-row">
        <Suspense fallback={<div className="hidden w-56 lg:block" />}>
          <ProductFilters categories={categories} />
        </Suspense>
        <div className="flex-1">
          <ProductGrid products={products} categories={categories} />
        </div>
      </div>
    </div>
  );
}
