/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/orders",
  //       permanent: true,
  //     },
  //   ];
  // },
  reactStrictMode: false,
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
