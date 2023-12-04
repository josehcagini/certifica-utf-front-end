import './globals.css'
import { Raleway } from 'next/font/google'

import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionProvider from '../components/sessionProvider/session'
import Login from './login/page'
import Navbar from '@/components/navbar/navbar'

//Modificar fontes e estilos globais nesse arquivo

const raleway = Raleway({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s | CertificaUTF',
    default: 'CertificaUTF',
  },
  description: 'Sistema de Emissão de Certificados',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="pt-br">
      <body className={raleway.className}>
        <SessionProvider session={session}>
          {
            !session ? (
              <Login />
            ) : (
              <>
                <Navbar />
                {children}
              </>
            )
          }
        </SessionProvider>
      </body>
    </html>
  )
}
  