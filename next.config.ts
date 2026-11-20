import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // две виллы в Гонио оказались одной (19.11.2026)
  async redirects() {
    return [
      { source: "/:lang/obekty/villa-gonio-3", destination: "/:lang/obekty/villa-gonio-2", permanent: true },
      // неоновая версия стала главной (20.11.2026): старые адреса /vice ведут на неё
      { source: "/:lang/vice", destination: "/:lang", permanent: false },
      { source: "/:lang/vice/obekty/:slug", destination: "/:lang/obekty/:slug", permanent: false },
    ];
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
