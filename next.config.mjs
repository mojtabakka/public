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
        hostname: "109.122.249.15", // آدرس سرور شما
        port: "3003", // پورتی که سرویس اجرا می‌شود
        pathname: "/asset/images/products/**", // مسیر فایل‌های تصویر
      },
    ],
  },
};

export default nextConfig;
