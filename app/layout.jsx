import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// components
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  // Load only the weights actually used to improve performance
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jetbrainsMono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "Adnan Ghani — Portfolio", template: "%s | Adnan Ghani" },
  description: "Portfolio, projects, experience, and contact.",
  alternates: { canonical: "/" },
  themeColor: "#0f172a",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Adnan Ghani — Portfolio",
    description: "Projects, experience, and contact.",
    url: "/",
    siteName: "Adnan’s Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adnan Ghani — Portfolio",
    description: "Projects, experience, and contact.",
    images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark light",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:bg-white focus:text-black focus:px-3 focus:py-1"
        >
          Skip to content
        </a>
        <Header />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
