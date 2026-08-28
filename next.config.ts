import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` that can be hosted on any CDN
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
