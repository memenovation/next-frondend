//packages
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

//functions
import { signInUser } from "@functions/auth/server";

export const authOptions = {
  //Configure JWT
  session: { strategy: "jwt" },
  //Specify Provider
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await signInUser(
            credentials.email,
            credentials.password
          );
          return user;
        } catch (error) {
          console.log("error", error.message);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
};

//@ts-ignore
export default NextAuth(authOptions);
