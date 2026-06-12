import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const proximaNova = localFont({
  src: [
    {
      path: "../public/ProximaNova/ProximaNovaRegular/ProximaNovaRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/ProximaNova/ProximaNovaBold/ProximaNovaBold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/ProximaNova/ProximaNovaBlack/ProximaNovaBlack.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adhitama89 — Rental Mobil Premium Terpercaya",
  description:
    "Sewa mobil premium dengan mudah, cepat, dan terjangkau. Armada lengkap, harga transparan, layanan 24/7. Pesan sekarang via WhatsApp!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        proximaNova.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
