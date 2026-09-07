import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getProductBySlug,
  getAllProducts,
  getCategoryById,
  getRelatedProducts,
  getAllCategories,
} from "@/lib/data/productService";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { DiscountBadge } from "@/components/ui/DiscountBadge";
import { Badge } from "@/components/ui/Badge";
import { ProductDetailActions } from "@/components/product/ProductDetailActions";
import { ProductRail } from "@/components/product/ProductRail";
import { getEffectivePrice } from "@/lib/utils/price";
import { getProductImageSrc } from "@/lib/utils/image";
import { Star, ChevronRight, Truck } from "@/components/ui/icons";
import { shopConfig } from "@/config/shop.config";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const [category, related, categories] = await Promise.all([
    getCategoryById(product.categoryId),
    getRelatedProducts(product, 5),
    getAllCategories(),
  ]);

  const price = getEffectivePrice(product);
  const image = getProductImageSrc(product.images, category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1 text-sm text-ink-muted dark:text-ink-muted-dark">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight width={14} height={14} />
        <Link href="/products" className="hover:text-brand-600">Shop</Link>
        {category ? (
          <>
            <ChevronRight width={14} height={14} />
            <Link href={`/products?category=${category.slug}`} className="hover:text-brand-600">{category.name}</Link>
          </>
        ) : null}
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface-alt dark:bg-surface-alt-dark">
          <Image src={image} alt={product.name} fill priority sizes="(max-width: 768px) 100vw, 500px" className="object-cover" />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.discountPriceInPaise ? (
              <DiscountBadge mrpInPaise={product.priceInPaise} sellingInPaise={product.discountPriceInPaise} />
            ) : null}
            {product.isNew ? <Badge tone="brand">NEW</Badge> : null}
            {product.isBestSeller ? <Badge tone="accent">BESTSELLER</Badge> : null}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink dark:text-ink-dark sm:text-3xl">{product.name}</h1>
            <p className="mt-1 text-sm text-ink-muted dark:text-ink-muted-dark">{product.unit}</p>
            {product.rating ? (
              <div className="mt-2 flex items-center gap-1.5 text-sm">
                <span className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 font-semibold text-success">
                  {product.rating} <Star width={12} height={12} />
                </span>
                <span className="text-ink-muted dark:text-ink-muted-dark">({product.reviewCount} reviews)</span>
              </div>
            ) : null}
          </div>

          <PriceDisplay priceInPaise={price} mrpInPaise={product.discountPriceInPaise ? product.priceInPaise : undefined} size="lg" />

          <p className={product.stock > 0 ? "text-sm font-medium text-success" : "text-sm font-medium text-danger"}>
            {product.stock > 0 ? `In stock (${product.stock} available)` : "Out of stock"}
          </p>

          <div className="rounded-lg border border-border dark:border-border-dark bg-surface-alt dark:bg-surface-alt-dark p-3 text-sm text-ink-soft dark:text-ink-soft-dark flex items-center gap-2">
            <Truck width={18} height={18} className="shrink-0" />
            Delivered in {shopConfig.estimatedDeliveryMinutes} mins from {shopConfig.shortName}
          </div>

          <ProductDetailActions product={product} />

          <div>
            <h2 className="mb-1.5 font-semibold text-ink dark:text-ink-dark">Product Description</h2>
            <p className="text-sm leading-relaxed text-ink-soft dark:text-ink-soft-dark">{product.description}</p>
          </div>

          {product.tags && product.tags.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} tone="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <ProductRail title="Related Products" products={related} categories={categories} />
    </div>
  );
}
