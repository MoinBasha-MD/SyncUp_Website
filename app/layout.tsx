import type { Metadata, Viewport } from "next";
import { Inconsolata, Pacifico } from "next/font/google";
import "./globals.css";
import { ParticleBackground } from "@/components/ParticleBackground";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";

// Same pairing the Syncup app uses: Inconsolata for UI, Pacifico for accents.
const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  variable: "--font-pacifico",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Syncup — One life. One rhythm. One sync.",
  description:
    "Syncup helps people share their rhythm, discover when their moments align, and connect at the right time. Explore the Open Network, join or host Ripples, go Live, and keep close with Sync Space and Pulse.",
  openGraph: {
    title: "Syncup — One life. One rhythm. One sync.",
    description: "Share your rhythm. Discover when moments align. Connect at the right time — with Open Network, Ripples, Live, Sync Space and Pulse.",
    type: "website",
    siteName: "Syncup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Syncup — One life. One rhythm. One sync.",
    description: "Share your rhythm. Discover when moments align. Connect at the right time — with Open Network, Ripples, Live, Sync Space and Pulse.",
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
      className={`${inconsolata.variable} ${pacifico.variable} h-full antialiased`}
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
