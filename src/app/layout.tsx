import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  weight: ['400', '700', '500', '800'],
  subsets: ['arabic'],
});

export const metadata: Metadata = {
  title: 'دفعة 1/3/2026',
  description: 'دفعة 1/3/2026',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} antialiased`}>{children}</body>
    </html>
  );
}
