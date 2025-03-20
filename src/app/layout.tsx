import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Supreme Store",
    template: "%s | Supreme Store",
  },
  description:
    "Supreme Store is an online marketplace offering a wide range of high-quality electronics and gadgets. From smartphones and laptops to smart home devices and accessories, it caters to tech enthusiasts with top-brand products at competitive prices. Fast shipping, secure payments, and excellent customer service make it a trusted choice.",
  openGraph: {
    title: "Supreme Store",
    description:
      "Supreme Store is an online marketplace offering a wide range of high-quality electronics and gadgets. From smartphones and laptops to smart home devices and accessories, it caters to tech enthusiasts with top-brand products at competitive prices. Fast shipping, secure payments, and excellent customer service make it a trusted choice.",
    // url: 'https://nextjs.org',
    siteName: "Supreme Store",
    images: [
      {
        url: "https://nextjs.org/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    videos: [
      {
        url: "https://nextjs.org/video.mp4", // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Toaster position="top-right" />
        <Provider>
          <Header />

          <div className="mt-20">{children}</div>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
