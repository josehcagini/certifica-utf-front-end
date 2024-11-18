// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import NextAuth from 'next-auth'

export type sessionUser = {
  id: string
  email: string
  name: string
  image: string | null
  roles: Array<userRoleEnum>
  accessToken: string
}

declare module 'next-auth' {
  interface Session {
    user: sessionUser
  }

  interface Account extends Partial<TokenSet> {
    providerAccountId: string
    userId?: string
    provider: string
    type: ProviderType
    user: sessionUser
  }

  interface User extends sessionUser {
    id: string
  }
}
