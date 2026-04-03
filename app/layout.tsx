import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "LaunchAdvisor — Go from idea to launched",
  description:
    "The step-by-step operating system for launching your business. 30 proven steps, expert guidance, and the right tools — all in one place.",
  openGraph: {
    title: "LaunchAdvisor — Go from idea to launched",
    description: "The step-by-step operating system for launching your business.",
    url: "https://launchadvisor.co",
    siteName: "LaunchAdvisor",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} ${bebasNeue.variable}`}>
      <head>
        {/* Bebas Neue loaded via CSS @import for display font */}
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
