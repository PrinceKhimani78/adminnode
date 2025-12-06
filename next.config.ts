// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me", // testimonials avatars
      },
      {
        protocol: "https",
        hostname: "logos-world.net", // company logos
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "1000logos.net", // company logos
      },
      {
        protocol: "https",
        hostname: "imgcdn.stablediffusionweb.com", // blog images
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com", // decorative illustrations
      },
    ],
  },

  // ✅ Allow production builds even with ESLint warnings or errors
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
