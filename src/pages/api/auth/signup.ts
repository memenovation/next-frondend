/*
 Endpoint to create a new user
*/

//packages
import { apiHandler } from "@functions/api/APIHandler";
import axios from "axios";
import { hash } from "bcryptjs";

//functions
import { mongoAPI } from "@functions/dataFetching";

//api handler
export default apiHandler(handler);

const mongoDefault = {
  db: "users_db",
  collection: "users",
};

export async function handler(req, res) {
  //only accept POST
  if (req.method !== "POST") throw "Method not allowed";

  //verify bearer token
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token || token !== process.env.AUTH_TOKEN) throw "Invalid token";

  //get credentials in body
  const { email, password } = req.body;

  //validate data structure
  if (!email || !email.includes("@") || !password) throw "Invalid data";

  //check if user already exists
  const user = await mongoAPI({
    action: "findOne",
    ...mongoDefault,
    filter: {
      email: email,
    },
  });

  if (user.document) throw "User already exists";

  //create user
  const createdUser = await mongoAPI({
    action: "insertOne",
    ...mongoDefault,
    document: {
      email: email,
      password: await hash(password, 12),
    },
  });
  console.log(createdUser);

  return res.status(201).json({ result: createdUser });
}
