import type { Metadata } from "next";
import { Providers } from "./providers";
import { SiteChrome } from "./site-chrome";
import { shopConfig } from "@/config/shop.config";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(shopConfig.seo.siteUrl),
  title: {
    default: shopConfig.seo.defaultTitle,
    template: `%s | ${shopConfig.shortName}`,
  },
  description: shopConfig.seo.defaultDescription,
  openGraph: {
    title: shopConfig.seo.defaultTitle,
    description: shopConfig.seo.defaultDescription,
    siteName: shopConfig.shortName,
    type: "website",
    images: ["/images/hero-banner.svg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
