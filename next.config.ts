import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/guides/[slug]": ["./lib/data/guides/tailored/*.json"],
  },
};

export default nextConfig;
