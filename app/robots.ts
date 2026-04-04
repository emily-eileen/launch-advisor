import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard", "/journal", "/onboarding", "/settings"],
      },
    ],
    sitemap: "https://launchadvisor.co/sitemap.xml",
  };
}
