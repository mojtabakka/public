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
        <html lang="fa" dir="rtl" className="scroll-smooth">
            <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300">
                {children}
            </body>
        </html>
    );
}