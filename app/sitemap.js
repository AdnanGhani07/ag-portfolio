export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  // Add your known routes here
  const routes = ["/", "/projects", "/contact", "/resume"].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
  return routes;
}
