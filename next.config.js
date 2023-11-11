/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    serverActions: {
      allowedOrigins: ["http://localhost:3000, https://lectio.muksiv.dk"],
    },
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
