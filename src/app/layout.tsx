import "./globals.css"
import { BackToTop } from "@/components/BackToTop";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen text-text bg-highlight"
      >
        <Navbar />
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
