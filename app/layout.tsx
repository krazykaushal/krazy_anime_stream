import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
const inter = FontSans({ subsets: ["latin"] });
import Navigate from "@/components/custom/Navigate";

import { cn } from "../lib/utils";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "Anime App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>
        <Navigate />
        {children}</body>
    </html>
  );
}
