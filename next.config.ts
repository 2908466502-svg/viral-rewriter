import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/viral-rewriter",
  images: { unoptimized: true },
}

export default nextConfig
