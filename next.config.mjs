/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customKey: process.env.NEXT_PUBLIC_BASE_URL,
  },
  experimental: {},
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "109.122.249.15",
        port: "3003",
        pathname: "/asset/images/products/**",
      },
    ],
  },
};

export default nextConfig;
