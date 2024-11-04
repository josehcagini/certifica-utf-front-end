import type { Metadata } from 'next'

import './globals.css'
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
        <body>{children}</body>
      </html>
    </SessionProvider>
  )
}
