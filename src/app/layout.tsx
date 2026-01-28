import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "FixVision AI | Agentic Repair Technician",
  description: "Turn complex repairs into simple step-by-step guides with agentic AI vision. Just upload a photo and let our AI technician identify the problem and guide you through the fix.",
  openGraph: {
    title: "FixVision AI | Agentic Repair Technician",
    description: "Intelligent Step-by-Step Repair Guides through Vision AI.",
    url: "https://fixvision-ai-233122189624.asia-southeast1.run.app",
    siteName: "FixVision AI",
    images: [
      {
        url: "/images/hero_device.png",
        width: 1200,
        height: 630,
        alt: "FixVision AI Hero",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FixVision AI | Agentic Repair Technician",
    description: "Intelligent Step-by-Step Repair Guides through Vision AI.",
    images: ["/images/hero_device.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
