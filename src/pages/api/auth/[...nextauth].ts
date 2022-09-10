//packages
import NextAuth from "next-auth";
const bcrypt = require("bcrypt");
import CredentialsProvider from "next-auth/providers/credentials";
//functions
import { mongoAPI } from "@functions/dataFetching";

//config
import { mongoDefault } from "@configs/mongoConfig";

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
          const { email, password } = credentials;

          //find user by email in mongoDB
          const result = await mongoAPI({
            ...mongoDefault,
            action: "findOne",
            filter: {
              email: credentials.email,
            },
          });

          const user = result.document;
          //Not found - send error res
          if (!user) return null;

          //Check hased password with DB password
          const checkPassword = await bcrypt.compare(
            credentials.password,
            user?.password
          );

          console.log("checkPassword", checkPassword);
          //Incorrect password - send response
          if (!checkPassword) {
            // throw "Password doesnt match";
            return null;
          }
          console.log("success", user);
          return user;
        } catch (error) {
          console.log("error", error);

          throw error;
        }
      },
    }),
  ],
};

//@ts-ignore
export default NextAuth(authOptions);
