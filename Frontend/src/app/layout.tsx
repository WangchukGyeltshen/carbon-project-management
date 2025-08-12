import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "./(auth)/contexts/AuthContext";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Carbon Project On-Boarding",
  description: "Carbon Project On-Boarding Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}


