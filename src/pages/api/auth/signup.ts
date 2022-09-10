/*
 Endpoint to create a new user
*/

//packages
import { apiHandler } from "@functions/api/APIHandler";
import axios from "axios";
const bcrypt = require("bcrypt");

//functions
import { mongoAPI } from "@functions/dataFetching";

//config
import { mongoDefault } from "@configs/mongoConfig";

//api handler
export default apiHandler(handler);

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
    ...mongoDefault,
    action: "findOne",
    filter: {
      email: email,
    },
  });

  if (user.document) throw "User already exists";

  //create user
  const createdUser = await mongoAPI({
    ...mongoDefault,
    action: "insertOne",
    document: {
      email: email,
      password: await bcrypt.hash(password, 12),
    },
  });
  console.log(createdUser);

  return res.status(201).json({ result: createdUser });
}
