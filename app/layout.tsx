import React from "react"
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { FournisseurPanier } from '@/components/contexte-panier'
import { ScrollToTop } from '@/components/scroll-to-top'

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'MAISON | Boutique de Luxe',
  description: 'Découvrez notre collection exclusive de mode et lifestyle haut de gamme',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <FournisseurPanier>
          <ScrollToTop />
          {children}
        </FournisseurPanier>
        <Analytics />
      </body>
    </html>
  )
}
