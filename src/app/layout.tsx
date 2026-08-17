export const metadata = {
  title: "فروشگاه عقاب",
  description: "سایت فروش دوربین مداربست و لوازم جانبی آن با قیمت مناسب",
  icons: {
    icon: "/favicon.ico", // یا png
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}