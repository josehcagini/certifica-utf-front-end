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
      session.user.roles = token.roles;
      session.access_token = {
        api: token.access_token_api,
        provider: token.access_token
      };
      return session
    },
    async signIn({ user, account, profile, email, credentials }) {

      try {
        console.log(account);
        const response = await getAcessTokenAPI( account ); 
        account = toAccount( account, response );
        console.log(account)
        return true;
      } catch (error) {
        console.log( error )
        return false;
      }
    },
  }
}
export default NextAuth(authOptions)
