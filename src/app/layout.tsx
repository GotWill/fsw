import { NextAuthProvider } from '@/providers/auth'
import './globals.css'
import { Poppins } from 'next/font/google'
import { Header } from '@/components/Header'
import { Foother } from '@/components/Foother'
import { ToastProvider } from '@/providers/toats'

const popins = Poppins({
  subsets: ['latin'], weight: [
    '100',
    '200',
    '600',
    '700',
    '800',
    '900'
  ]
})

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de viagens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={popins.className}>
        <NextAuthProvider>
          <ToastProvider>
            <Header />
            {children}
            <Foother />
          </ToastProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
