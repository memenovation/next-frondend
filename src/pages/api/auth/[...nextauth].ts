//packages
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

//config
import prisma from "@configs/prisma";

//functions
import { loginUser } from "@functions/dataFetching";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
          //login user
          const user = await loginUser(credentials.email, credentials.password);
          console.log("success", user);
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
