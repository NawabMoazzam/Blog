import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'jolly-flame-2138b8d190.media.strapiapp.com',
      },
    ],
    unoptimized: true,
  }
};

export default nextConfig;