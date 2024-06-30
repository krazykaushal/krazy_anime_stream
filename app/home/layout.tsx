"use client"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./../globals.css";
const inter = FontSans({ subsets: ["latin"] });
import Navigate from "@/components/custom/Navigate";

import { QueryClient, QueryClientProvider } from "react-query";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  );
}
