import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'demo.cymolthemes.com',
      },
      {
        protocol: "https",
        hostname: 'img.freepik.com'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com'
      }
    ],
  },
};

export default nextConfig;
