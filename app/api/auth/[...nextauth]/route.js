import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import Google from "next-auth/providers/google";
const handler = NextAuth ({
  //  one or more authentication providers
  providers: [
    GithubProvider({
      clientId: 'Ov23liI9Gj9TOjArxWm6',
      clientSecret: '566017fe438815c66d305510fd0d7210221afb05',
    }),
  
  ],
})
export {handler as GET, handler as POST}