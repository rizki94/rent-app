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
  title: "Adhitama89 | Sewa & Rental Mobil Bandung Lepas Kunci Murah Premium",
  description:
    "Rental mobil Bandung terpercaya dengan armada premium terlengkap (Avanza, Innova, CRV). Sewa mobil lepas kunci atau dengan driver ramah 24/7. Hubungi Adhitama89 sekarang!",
  keywords: [
    "sewa mobil bandung",
    "rental mobil bandung",
    "sewa mobil lepas kunci bandung",
    "rental alphard bandung",
    "sewa avanza bandung",
    "rental mobil murah bandung",
    "sewa mobil dengan supir bandung",
    "sewa innova bandung",
    "rental innova bandung",
    "sewa crv bandung",
    "rent car bandung",
    "sewa mobil bandung murah",
    "adhitama89",
    "adhitama89 rental",
  ],
  metadataBase: new URL("https://www.adhitama89rental.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adhitama89 | Sewa & Rental Mobil Bandung Premium Terpercaya",
    description:
      "Rental mobil Bandung terpercaya dengan armada premium terlengkap (Avanza, Innova, CRV). Sewa mobil lepas kunci atau dengan driver ramah 24/7.",
    url: "https://www.adhitama89rental.com",
    siteName: "Adhitama89 Rental Mobil Bandung",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/hero-bg.png",
        width: 1200,
        height: 630,
        alt: "Adhitama89 Rental Mobil Bandung Premium",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adhitama89 | Sewa & Rental Mobil Bandung Premium Terpercaya",
    description:
      "Rental mobil Bandung terpercaya dengan armada premium terlengkap. Sewa mobil lepas kunci atau dengan driver ramah 24/7.",
    images: ["/hero-bg.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
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
