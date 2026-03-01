import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AI Rubber Duck Debugger",
    default: "AI Rubber Duck Debugger | The Autonomous Pair Programmer",
  },
  description: "Stop staring at StackOverflow. Integrate a highly-trained, cynical AI companion directly into your workflow to instantly identify failing logic and write flawless fixes.",
  openGraph: {
    title: "AI Rubber Duck Debugger",
    description: "The autonomous debugging companion that roasts your code.",
    images: [{
      url: 'https://sell.delights.pro/duck-og.png', // Fallback URL if we host an asset
      width: 1200,
      height: 630,
      alt: 'AI Rubber Duck Debugger Preview'
    }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Rubber Duck Debugger",
    description: "The autonomous debugging companion that roasts your code.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
