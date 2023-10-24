/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lectio.dk",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/lectio/:path*",
        destination: "https://www.lectio.dk/lectio/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
