/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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

  swcMinify: true,
};

module.exports = nextConfig;
