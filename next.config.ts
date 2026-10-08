import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/academy',
        destination: '/Training',
        permanent: true,       // Returns 308
      },
      {
        source: '/index',
        destination: '/intelligence',
        permanent: true,
      },
      {
        source: '/briefs',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/assessment',
        destination: '/cognitive-audit',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
