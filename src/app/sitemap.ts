import type { MetadataRoute } from "next";
import { getAllProducts, getAllCategories } from "@/lib/data/productService";
import { shopConfig } from "@/config/shop.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
  const base = shopConfig.seo.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = ["", "/products", "/cart", "/account"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/products?category=${c.slug}`,
    changeFrequency: "daily",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
