import { Nunito, Poppins } from 'next/font/google'

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

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.className} ${nunito.variable} ${poppins.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
