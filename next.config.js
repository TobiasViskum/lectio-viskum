/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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
