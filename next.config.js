/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "http",
  //       hostname: "localhost",
  //       port: "3003",
  //       pathname: "http://localhost:3003/",
  //     },
  //   ],
  // },

  swcMinify: true,
};

module.exports = nextConfig;
