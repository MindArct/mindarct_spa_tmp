import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Screenshots are pre-compressed in /public; skipping the optimizer keeps us inside Vercel Hobby limits.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
