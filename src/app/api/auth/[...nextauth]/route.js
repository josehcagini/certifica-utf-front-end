import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { getAcessTokenAPI, toAccount } from './AuthService'

export const authOptions = {
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if ( account ) {
        token.roles = account.roles;
        token.access_token = account.access_token;
        token.access_token_api = account.access_token_api;
      }
      return token
    },
    async session({ session, token, user }) {
      session.user.nrUuid = token.sub;
      session.user.roles = token.roles;
      session.access_token = {
        api: token.access_token_api,
        provider: token.access_token
      };
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {

      try {
        const response = await getAcessTokenAPI( account ); 
        account = toAccount( account, response );
        return true;
      } catch (error) {
        console.log( error )
        return false;
      }
    },
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}

