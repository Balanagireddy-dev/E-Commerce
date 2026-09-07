import { HeroBanner } from "@/components/layout/HeroBanner";
import { CategoryCard } from "@/components/product/CategoryCard";
import { ProductRail } from "@/components/product/ProductRail";
import { OfferBanner } from "@/components/product/OfferBanner";
import { ProductGrid } from "@/components/product/ProductGrid";
import {
  getAllCategories,
  getAllProducts,
  getPopularProducts,
  getBestSellerProducts,
  getNewProducts,
  getAllOffers,
} from "@/lib/data/productService";

export default async function HomePage() {
  const [categories, products, popular, bestSellers, newProducts, offers] = await Promise.all([
    getAllCategories(),
    getAllProducts(),
    getPopularProducts(10),
    getBestSellerProducts(10),
    getNewProducts(10),
    getAllOffers(),
  ]);

  return (
    <div>
      <HeroBanner />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <h2 className="mb-3 text-lg font-bold text-ink sm:text-xl">Shop by Category</h2>
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-7 sm:gap-3 sm:px-0">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {offers.map((offer) => (
            <OfferBanner key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      <ProductRail title="Popular Products" products={popular} categories={categories} viewAllHref="/products?sort=popular" />
      <ProductRail title="Best Sellers" products={bestSellers} categories={categories} viewAllHref="/products?sort=popular" />
      <ProductRail title="New Arrivals" products={newProducts} categories={categories} viewAllHref="/products?sort=newest" />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <h2 className="mb-3 text-lg font-bold text-ink sm:text-xl">All Products</h2>
        <ProductGrid products={products.slice(0, 10)} categories={categories} />
      </section>
    </div>
  );
}
