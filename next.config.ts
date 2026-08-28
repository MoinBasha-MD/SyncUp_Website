import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.replace(/.*\//, "") || "SyncUp_Website";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` that can be hosted on any CDN
  output: "export",
  images: {
    unoptimized: true,
  },
  // When building on GitHub Actions, prefix assets with the repo name
  // so they load correctly from https://<user>.github.io/<repo>/
  ...(isGitHubActions
    ? {
        basePath: `/${repo}`,
        assetPrefix: `/${repo}/`,
      }
    : {}),
};

export default nextConfig;
