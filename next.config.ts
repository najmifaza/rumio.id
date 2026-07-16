import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: "/uploads/:path*",
          destination: "https://rumio.id/uploads/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
