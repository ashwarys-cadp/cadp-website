import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Using standard deployment (not static export) to support API routes
  // Vercel will handle this automatically with serverless functions
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
