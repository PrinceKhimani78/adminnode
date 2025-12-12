/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      // Testimonials avatars
      {
        protocol: "https",
        hostname: "randomuser.me",
      },

      // Company logos (frequent)
      {
        protocol: "https",
        hostname: "1000logos.net",
      },
      {
        protocol: "https",
        hostname: "logos-world.net",
      },
      {
        protocol: "https",
        hostname: "imgcdn.stablediffusionweb.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },

      // Icon + vector sources
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "seeklogo.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },

  // Prevent build failures on ESLint warnings/errors
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable faster SWC compiler
  swcMinify: true,
};

module.exports = nextConfig;
