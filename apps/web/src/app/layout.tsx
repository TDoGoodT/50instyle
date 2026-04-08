import type { Metadata } from 'next'
import { Assistant, Frank_Ruhl_Libre } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { QueryProvider } from '@/context/QueryProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const assistant = Assistant({
  subsets: ['hebrew', 'latin'],
  variable: '--font-assistant',
  display: 'swap',
})

const frankRuhlLibre = Frank_Ruhl_Libre({
  subsets: ['hebrew', 'latin'],
  variable: '--font-frank',
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'לימור בכר – סטייליסטית אישית | 50inStyle',
    template: '%s | 50inStyle',
  },
  description:
    'שירותי סטיילינג אישי, סדנאות סטיילינג ושוברי מתנה. לימור בכר עוזרת לנשים להתלבש נכון ולהרגיש בטוחות בעצמן.',
  metadataBase: new URL('https://www.50instyle.co.il'),
  openGraph: {
    locale: 'he_IL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${assistant.variable} ${frankRuhlLibre.variable}`}>
      <body className="font-assistant bg-white text-gray-900 antialiased">
        <QueryProvider>
          <CartProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-50 focus:rounded focus:bg-gold-600 focus:px-4 focus:py-2 focus:text-white"
            >
              דלג לתוכן הראשי
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
