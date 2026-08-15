import type { Metadata } from "next";
import { Geologica, IBM_Plex_Mono, Literata } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geologica = Geologica({
  variable: "--font-geologica",
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gradient-atlas.ugrp44group.chatgpt.site"),
  title: {
    default: "Gradient Atlas: Learn AI without the mythology",
    template: "%s · Gradient Atlas",
  },
  description:
    "A source-traceable, interactive course from machine-learning fundamentals to the moving AI frontier.",
  openGraph: {
    title: "Gradient Atlas",
    description: "Learn the machinery. Keep the boundaries.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Gradient Atlas over an editorial map of loss contours and gradient paths",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Atlas",
    description: "Learn the machinery. Keep the boundaries.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geologica.variable} ${literata.variable} ${plexMono.variable}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
