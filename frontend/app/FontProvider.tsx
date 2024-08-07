'use client'

import { Unbounded } from "next/font/google";
import localFont from 'next/font/local'

const unbounded = Unbounded({ subsets: ['latin'] });
const circular = localFont({
  src: [
    {
      path: '../assets/circular-std-medium-500.ttf',
    },
  ]
})

export function FontProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${unbounded.className} ${circular.className}`}>
      {children}
    </div>
  );
}