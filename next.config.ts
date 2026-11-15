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
      { source: '/solutions/:slug(artificial-intelligence|ai-agents|ai-integration|copilot-studio)', destination: '/solutions#artificial-intelligence', permanent: true },
      { source: '/solutions/power-bi', destination: '/solutions#power-bi', permanent: true },
      { source: '/solutions/:slug(power-apps|power-automate|power-pages|power-platform|power-platform-ai)', destination: '/solutions#power-apps', permanent: true },
      { source: '/solutions/salesforce', destination: '/solutions#salesforce', permanent: true },
      { source: '/solutions/data-readiness', destination: '/solutions', permanent: true },
      { source: '/digital-growth/:path*', destination: '/solutions#digital-growth', permanent: true },
      { source: '/growth-blueprint', destination: '/contact', permanent: true },
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
