import { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'
import Footer from '@components/shared/Footer'
import Header from '@components/shared/Header'
import Providers from '@components/shared/Providers'
import Sidebar from '@components/shared/Sidebar'
import { cn } from '@utils/style'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My-Blog-Chat',
  description: 'My-Blog-Chat 개발 블로그 및 챗봇',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Providers>
          <div
            className={cn(
              'flex w-screen h-screen text-sm lg:text-base',
              inter.className,
            )}
          >
            <Sidebar />
            <div className="flex flex-col flex-1">
              <Header />
              <div className="flex flex-col flex-1 overflow-y-auto">
                <main className="flex flex-col flex-1">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
