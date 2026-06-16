import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Nunito_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
})
const nunitoSans = Nunito_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://venuediary.vercel.app'),
  title: {
    default: 'Best Marriage Palaces & Venues in Chandigarh, Mohali, Zirakpur | VenueDiary',
    template: '%s | VenueDiary',
  },
  description:
    'Find and book the best wedding venues, marriage palaces, and luxury banquets in Chandigarh, Mohali, and Zirakpur. Check real-time availability for your special day',
  keywords: [
    'venues',
    'wedding venues',
    'event spaces',
    'ballroom',
    'rooftop venue',
    'garden venue',
    'venue booking',
  ],
  authors: [{ name: 'VenueDiary' }],
  creator: 'VenueDiary',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    title: 'Best Marriage Palaces & Event Venues in Chandigarh, Mohali, Zirakpurs',
    description:
      'Browse curated marriage palaces, party halls, and wedding lawns in the Tri-city area.',
    siteName: 'VenueDiary',
    url: 'https://venuediary.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Marriage Palaces & Event Venues in Chandigarh, Mohali, Zirakpur',
    description:
      'Browse curated marriage palaces, party halls, and wedding lawns in the Tri-city area.',
  },
  robots: { index: true, follow: true },
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

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7efe9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${nunitoSans.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
