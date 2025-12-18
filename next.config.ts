import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // disable for now to avoid double render issues

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "1000logos.net" },
      { protocol: "https", hostname: "logos-world.net" },
      { protocol: "https", hostname: "imgcdn.stablediffusionweb.com" },
      { protocol: "https", hostname: "static.vecteezy.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "seeklogo.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  // IMPORTANT: disable experimental streaming issues
  experimental: {
    serverActions: false,
  },
};

export default nextConfig;
