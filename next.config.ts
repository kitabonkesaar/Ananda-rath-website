import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any hostname (e.g. Convex storage, placehold.co)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Keep @/ alias resolving to ./src
  experimental: {
    // serverActions are stable in Next 14, no flag needed
  },
};

export default nextConfig;
