import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const unbounded = Unbounded({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Cents",
  description: "The ultimate expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={unbounded.className}>{children}</body>
    </html>
  );
}
