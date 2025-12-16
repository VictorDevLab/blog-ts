import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { BlogProvider } from "./context/BlogContext";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "A modern blogging platform built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} antialiased px-6 md:px-12`}>
        <BlogProvider>
          {children}
        </BlogProvider>
      </body>
    </html>
  );
}
