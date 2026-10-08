import type { Metadata } from "next";
import { Geist, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ui/ToastProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "নিত্যপ্রয়োজনীয় পণ্যের বাজারদর, মূল্য পরিবর্তন এবং বাজারভিত্তিক দাম এক নজরে দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className={`${geist.variable} ${hindSiliguri.variable} antialiased`}>
        <Navbar />
        {children}
        <ToastProvider />
        <Footer />
      </body>
    </html>
  );
}
