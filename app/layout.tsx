import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';

import { TooltipProvider } from '@/components/ui/tooltip';

import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  variable: '--font-be-vietnam',
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'UII — Minh bạch tài chính cộng đồng',
  description: 'UI MVP quản lý khoản chi, chứng từ và minh bạch tài trợ cho các dự án cộng đồng.',
  icons: {
    icon: '/brand/favicon.png',
    apple: '/brand/uii-app-icon.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={beVietnam.variable}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
