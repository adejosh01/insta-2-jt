import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { split } from "postcss/lib/list"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  //theme: {
    //logo: "../../../public/image/insta_logo.png",
   // brandColor: "#F13287",
    //colorScheme: "auto"
  //}
  pages :{
    signIn: "/auth/signin"
  },
  callbacks: {
    async session({ session, token, user}) {
        session.user.username =  session.user.name,
        split('')
        .join("")
        .toLocaleLowerCase();

        session.user.id = token.sub;
        return session;
    }
  }
}

export default NextAuth(authOptions)