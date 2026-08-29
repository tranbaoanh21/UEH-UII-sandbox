import type { Metadata } from 'next';
import { Geist, Lora } from 'next/font/google';
import './globals.css';

const geist = Geist({
  variable: '--font-sans',
  subsets: ['latin', 'latin-ext'],
});

const lora = Lora({
  variable: '--font-serif',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Minh Bạch — MVP quản lý tài trợ cộng đồng',
  description: 'Prototype nền tảng quản lý chứng từ, ngân sách và minh bạch dòng tiền cho dự án cộng đồng.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={`${geist.variable} ${lora.variable} antialiased`}>{children}</body>
    </html>
  );
}
