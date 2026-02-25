/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/candidate-profile/:path*',
        destination: 'https://api.rojgariindia.com/api/candidate-profile/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
