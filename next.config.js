/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.lectio.dk",
      },
    ],
  },
};

module.exports = nextConfig;
