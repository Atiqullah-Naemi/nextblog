import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "mockmind-api.uifaces.co",
      },
    ],
  },
};

export default nextConfig;
