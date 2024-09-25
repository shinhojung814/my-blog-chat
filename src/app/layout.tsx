import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Inter } from 'next/font/google'
import { useState } from 'react'

import '@/styles/globals.css'
import Footer from '@components/Footer'
import Header from '@components/Header'
import Sidebar from '@components/Sidebar'
import { cn } from '@utils/style'

const inter = Inter({ subsets: ['latin'] })

export default function App({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <html lang="ko">
      <head />
      <body>
        <QueryClientProvider client={queryClient}>
          <div
            className={cn(
              'flex w-screen h-screen text-sm lg:text-base',
              inter.className,
            )}
          >
            <Sidebar
              isOpen={isSidebarOpen}
              close={() => setIsSidebarOpen(false)}
            />
            <div className="flex flex-col flex-1">
              <Header
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
              />
              <div className="flex flex-col flex-1 overflow-y-auto">
                <main className="flex flex-col flex-1">{children}</main>
                <Footer />
              </div>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  )
}
