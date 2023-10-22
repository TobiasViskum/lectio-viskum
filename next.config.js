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
  webpack: (config, options) => {
    config.ignoreWarnings = [
      {
        module: /node_modules[\\/]deasync/,
      },
      {
        module: /node_modules[\\/]http-cookie-agent/,
      },
    ];
    return config;
  },
};

module.exports = nextConfig;
