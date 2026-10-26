import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'theplugd.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/if-i-wanted-to-become-a-millionaire-in-2027-this-is-what-id-do-full-blueprint',
        destination: '/if-i-wanted-to-become-a-millionaire-in-2026-this-is-what-id-do-full-blueprint',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
