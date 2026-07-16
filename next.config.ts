import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async rewrites() {
    // PENTING: Proxy /uploads hanya aktif di development.
    // Di production (Hostinger), file di-serve langsung dari disk.
    // Jika proxy aktif di production, akan terjadi infinite loop:
    // rumio.id/uploads/* → proxy → rumio.id/uploads/* → ECONNRESET
    if (!isDev) {
      return { beforeFiles: [], afterFiles: [], fallback: [] };
    }

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
