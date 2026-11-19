import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // две виллы в Гонио оказались одной (19.11.2026)
  async redirects() {
    return [{ source: "/:lang/obekty/villa-gonio-3", destination: "/:lang/obekty/villa-gonio-2", permanent: true }];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
