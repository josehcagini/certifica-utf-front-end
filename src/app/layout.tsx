import type { Metadata } from 'next'

import './globals.css'
import AppMenubar from '@/components/app-menubar'
import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { SessionProvider } from '@/providers/SessionProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | CertificaUTF',
    default: 'CertificaUTF',
  },
  description: 'Sistema de Emissão de Certificados',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <html lang="pt-br">
        <body>
          <SidebarProvider>
            <AppSidebar />
            <main className={cn('max-w-screen w-full')}>
              <AppMenubar />
              {children}
            </main>
          </SidebarProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
