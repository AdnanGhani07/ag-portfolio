import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const routes = ["/", "/projects", "/contact", "/resume"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  return routes;
}
