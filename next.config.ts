import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [{ source: "/catalogo", destination: "/#catalogo", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/catalogo-natale-2026.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
          { key: "Content-Disposition", value: "inline; filename=\"catalogo-natale-2026.pdf\"" },
          { key: "Accept-Ranges", value: "bytes" }
        ]
      },
      {
        source: "/pdf.worker.:version.mjs",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      },
      {
        source: "/wasm/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      }
    ];
  }
};

export default nextConfig;
