import type { Metadata } from "next";
import { Unbounded } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import localFont from '@next/font/local'

const unbounded = Unbounded({ subsets: ['latin'] });
const circular = localFont({
  src: [
    {
      path: '../assets/circular-std-medium-500.ttf',
    },
  ]
})

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
      <body className={`${unbounded.className} bg-neutral-300 dark:bg-black`} suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
