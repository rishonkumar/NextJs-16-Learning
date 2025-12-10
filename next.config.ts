import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: ""
      },
      {
        hostname: "upbeat-chipmunk-985.convex.cloud",
        port: "",
        protocol: "https",
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },

};

export default nextConfig;
