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

const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("kirana_theme_v1");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col bg-surface-alt dark:bg-surface-alt-dark text-ink dark:text-ink-dark">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
