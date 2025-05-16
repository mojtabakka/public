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
        hostname: "185.255.90.43", // آدرس سرور شما
        port: "3003", // پورتی که سرویس اجرا می‌شود
        pathname: "/asset/images/products/**", // مسیر فایل‌های تصویر
      },
    ],
  },
};

export default nextConfig;
