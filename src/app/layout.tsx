import type { Metadata } from "next";
import "./globals.css";

import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "دفعة 1/3/2026",
  description: "دفعة 1/3/2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased`}>{children}</body>
    </html>
  );
}
