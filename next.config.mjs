/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-61bedfe304674c29b2a178b480d101cf.r2.dev",
      },
      // Keep placehold.co just in case it's used elsewhere
      {
        protocol: "https",
        hostname: "placehold.co",
      }
    ],
  },
};

export default nextConfig;
