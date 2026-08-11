import type { Metadata } from "next";
import { Bodoni_Moda, IBM_Plex_Mono } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { EVENT } from "@/lib/config";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${EVENT.name} ${EVENT.year} — ${EVENT.tagline}`,
  description: `${EVENT.name} ${EVENT.year}. ${EVENT.daysCount} days of building in ${EVENT.location}. ${EVENT.dates}. A house full of builders — not a conference, not a hackathon.`,
  keywords: [
    "Hacker House Goa",
    "HH Goa 2026",
    "hackathon Goa",
    "builders community",
    "tech event India",
    "28-31 October 2026",
  ],
  openGraph: {
    title: `${EVENT.name} ${EVENT.year} — ${EVENT.tagline}`,
    description: `${EVENT.daysCount} days of building in ${EVENT.location}. ${EVENT.dates}.`,
    url: EVENT.officialUrl,
    siteName: `${EVENT.name} ${EVENT.year}`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${EVENT.name} ${EVENT.year}`,
    description: `${EVENT.daysCount} days of building in ${EVENT.location}. ${EVENT.dates}.`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
