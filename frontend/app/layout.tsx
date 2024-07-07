import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const dellaRespira = Libre_Franklin({
  weight: '400',
  subsets: ['latin'],
});

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
      <body className={dellaRespira.className}>{children}</body>
    </html>
  );
}
