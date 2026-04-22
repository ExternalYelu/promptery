import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Promptery — UI prompts, previewed.",
  description:
    "A curated library of AI UI design prompts. See the preview, copy the prompt, ship the interface.",
  metadataBase: new URL("https://promptery.dev"),
  openGraph: {
    title: "Promptery",
    description:
      "A curated library of AI UI design prompts. Preview, copy, ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full app-bg text-[color:var(--color-fg)] selection:bg-[color:var(--color-accent-soft)] selection:text-white">
        {children}
      </body>
    </html>
  );
}
