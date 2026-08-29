import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ParticleBackground } from "@/components/ParticleBackground";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syncup — One life. One rhythm. One sync.",
  description:
    "Syncup helps people share their rhythm, discover when their moments align, and connect at the right time. Stop asking 'Are you free?' — let the moment find you.",
  openGraph: {
    title: "Syncup — One life. One rhythm. One sync.",
    description: "Share your rhythm. Discover when moments align. Connect at the right time.",
    type: "website",
    siteName: "Syncup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syncup — One life. One rhythm. One sync.",
    description: "Share your rhythm. Discover when moments align. Connect at the right time.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" style={{ background: "var(--bg-deep)" }}>
        <LoadingScreen />
        <ParticleBackground />
        <Navbar />
        <div className="content-wrapper">{children}</div>
      </body>
    </html>
  );
}
