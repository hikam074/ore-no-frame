"use client"

import "./globals.css"
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRef } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerRef = useRef<HTMLDivElement>(null)
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col text-text bg-highlight"
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <BackToTop footerRef={footerRef} />
        <div ref={footerRef} className="h-px" />
        <Footer />
      </body>
    </html>
  );
}
