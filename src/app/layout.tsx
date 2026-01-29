import "./globals.css"
import { BackToTop } from "@/components/BackToTop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col text-text bg-highlight"
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
