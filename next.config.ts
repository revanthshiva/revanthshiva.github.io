import type { NextConfig } from "next";

// Set in CI (GitHub Actions) to the repo name so assets resolve under
// https://<user>.github.io/<repo>/. Empty for local dev and root-hosted deploys.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static HTML/CSS/JS export (out/) — deployable to GitHub Pages or any static host.
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
