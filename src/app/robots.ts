import type { MetadataRoute } from "next";
import { shopConfig } from "@/config/shop.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
    ],
    sitemap: `${shopConfig.seo.siteUrl}/sitemap.xml`,
  };
}
