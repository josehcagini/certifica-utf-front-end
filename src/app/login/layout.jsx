export const metadata = {
    title: "Login",
    description: "Página de login",
}

//const metadata define título e descrição da página

export default function RootLayout({ children }) {
    return (
      <html lang="pt-br">
        <body>{children}</body>
      </html>
    )
  }
  