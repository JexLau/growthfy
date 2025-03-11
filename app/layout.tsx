import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GTag, Umami } from "@/lib/scripts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Growthfy.ai - 转化社媒噪声为增长洞察",
  description: "Growthfy.ai 帮助企业将无序的社交媒体信息流转化为有序的商业智能，发现隐藏的市场趋势、消费者情绪和竞争动态，让数据驱动决策变得简单高效。",
  keywords: "社交媒体监控, AI洞察分析, 市场趋势, 消费者情绪分析, 竞争情报, 数据驱动决策, 商业智能",
  authors: [{ name: "Growthfy.ai 团队" }],
  creator: "Growthfy.ai",
  publisher: "Growthfy.ai",
  openGraph: {
    title: "Growthfy.ai - 转化社媒噪声为增长洞察",
    description: "将无序的社交媒体信息流转化为有序的商业智能，让数据驱动决策不再复杂",
    url: "https://growthfy.ai",
    siteName: "Growthfy.ai",
    images: [
      {
        url: "https://growthfy.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Growthfy.ai - 社交媒体AI洞察分析平台",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growthfy.ai - 转化社媒噪声为增长洞察",
    description: "将无序的社交媒体信息流转化为有序的商业智能，让数据驱动决策不再复杂",
    images: ["https://growthfy.ai/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://growthfy.ai",
    languages: {
      'en-US': 'https://growthfy.ai',
      'zh-CN': 'https://growthfy.ai/zh',
    },
  },
  verification: {
    google: "verification_token", // 需替换为实际的Google站点验证令牌
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  category: 'business tools',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-secondary-foreground`}
      >
        <GTag />
        <Umami />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}