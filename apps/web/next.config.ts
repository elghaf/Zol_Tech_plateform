import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*', // Make sure this matches your backend URL
      },
    ];
  },
  output: 'standalone',
};

export default nextConfig;


