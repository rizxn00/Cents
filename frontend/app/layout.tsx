import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import "./globals.css";
import { ThemeProviderWrapper } from "./ThemeProviderWrapper";

const unbounded = Unbounded({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Cents",
  description: "The expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={unbounded.className}>
        <ThemeProviderWrapper>
          <div className="bg-neutral-300 dark:bg-black">
            {children}
          </div>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
