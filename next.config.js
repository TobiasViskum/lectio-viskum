/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["lectio.dk"],
  },
};

module.exports = nextConfig;
