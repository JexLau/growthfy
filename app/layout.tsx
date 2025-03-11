import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { GTag, Umami } from "@/lib/scripts";
// import { Analytics } from "@vercel/analytics/react";

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
  title: "LLMs.txt Generator - Create AI-training friendly text for any website",
  description: "All-in-one tool to help website owners create llms.txt files that meet AI training standards, optimizing your site content for AI models",
  keywords: "llms.txt, AI training, website optimization, artificial intelligence, SEO, content management",
  authors: [{ name: "LLMs.txt Generator" }],
  creator: "LLMs.txt Generator Team",
  publisher: "LLMs.txt Generator",
  openGraph: {
    title: "LLMs.txt Generator - Create AI-training friendly text for any website",
    description: "All-in-one tool to help website owners create llms.txt files that meet AI training standards, optimizing your site content for AI models",
    url: "https://llmstxtgenerator.net",
    siteName: "LLMs.txt Generator",
    images: [
      {
        url: "https://images.unsplash.com/photo-1655720031554-a929595d5fb0?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "LLMs.txt Generator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLMs.txt Generator - Create AI-training friendly text for any website",
    description: "All-in-one tool to help website owners create llms.txt files that meet AI training standards, optimizing your site content for AI models",
    images: ["https://images.unsplash.com/photo-1655720031554-a929595d5fb0?q=80&w=1200&auto=format&fit=crop"],
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
    canonical: "https://llmstxtgenerator.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
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
          {/* <Analytics /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
