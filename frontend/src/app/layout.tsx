import { Metadata } from 'next'
import { Nunito, Poppins } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'PLAYCINE - Discover Unlimited Movies and TV Shows',
    template: '%s | PLAYCINE',
  },
}

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`bg-black text-white w-screen overflow-x-hidden h-screen min-h-screen ${poppins.className} ${nunito.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
