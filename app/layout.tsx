import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eleanor Hayes — North Shore Real Estate | Hayes & Harbor Realty",
  description:
    "Buy and sell with confidence on Massachusetts' North Shore. Eleanor Hayes guides buyers and sellers in Marblehead, Salem, Beverly Farms and Manchester-by-the-Sea.",
  openGraph: {
    title: "Eleanor Hayes — North Shore Real Estate",
    description: "Buy and sell with confidence on the North Shore.",
    images: ["/images/colonial-exterior.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${interTight.variable} antialiased`}>
      <body className="grain">{children}</body>
    </html>
  );
}
