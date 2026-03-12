import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter, Playfair_Display, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wedding Invitation',
  description: 'Trang thiệp mời cưới trực tuyến',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable} ${dancing.variable}`}>
      <body>{children}</body>
    </html>
  )
}
