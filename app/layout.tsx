import type { Metadata, Viewport } from "next";
import { Unbounded, Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Atkinson_Hyperlegible_Next({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Revanth Shiva, Full Stack Developer",
  description: "Revanth Shiva — I build the software a business runs on, and keep it running.",
  openGraph: {
    title: "Revanth Shiva, Full Stack Developer",
    description: "I build the software a business runs on, and keep it running.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
