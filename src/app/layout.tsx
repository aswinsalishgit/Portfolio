import type { Metadata } from "next";
import { Syne, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { PageTransitionProvider } from "@/components/PageTransitionContext";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aswinsalish.me"),
  title: "ASWIN SALISH | FULLSTACK DEVELOPER",
  description: "High-performance digital architectures where motorsport engineering meets brutalist minimalism.",
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    title: "ASWIN SALISH | FULLSTACK DEVELOPER",
    description: "High-performance digital architectures where motorsport engineering meets brutalist minimalism.",
    url: "https://aswinsalish.me",
    siteName: "Aswin Salish Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aswin Salish | Portfolio Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASWIN SALISH | FULLSTACK DEVELOPER",
    description: "High-performance digital architectures where motorsport engineering meets brutalist minimalism.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background text-foreground selection:bg-accent selection:text-black">
      <body className={`${syne.variable} ${spaceGrotesk.variable} ${ibmMono.variable} min-h-screen font-body flex flex-col`}>
        <div className="noise-overlay" />
        <SmoothScroll>
          <Header />
          <nav className="h-20" /> {/* Spacer for fixed header */}
          <PageTransitionProvider>
            <main className="flex-grow">
              {children}
            </main>
          </PageTransitionProvider>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
