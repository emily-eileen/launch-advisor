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
  metadataBase: new URL('https://launchadvisor.co'),
  title: "LaunchAdvisor — The Step-by-Step Business Launch Copilot",
  description: "Stop guessing how to start your business. The free, industry-specific 10-step checklist to form, build, launch, and scale with confidence.",
  keywords: "how to start a business, business setup checklist, LLC formation, SBA loans, find a business bank account, small business launch",
  openGraph: {
    title: "LaunchAdvisor — Go from idea to launched",
    description: "The step-by-step operating system for launching your business.",
    url: "https://launchadvisor.co",
    siteName: "LaunchAdvisor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LaunchAdvisor App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "LaunchAdvisor",
    card: "summary_large_image",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "LaunchAdvisor",
              "url": "https://launchadvisor.co",
              "description": "The step-by-step 10-step checklist to start, build, and launch a business.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://launchadvisor.co/guides?industry={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-ink antialiased" style={{ fontFamily: "var(--font-body)" }}>
        {children}
      </body>
    </html>
  );
}
