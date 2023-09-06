import './globals.css'
import { Inter } from 'next/font/google'

//Modificar fontes e estilos globais nesse arquivo

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title:{
    template: '%s | Fabrica 2023-2',
    default: 'Fabrica 2023-2',
  },
  description: 'Sistema de Emissão de Certificados',
}

//Não alterar o código abaixo

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
