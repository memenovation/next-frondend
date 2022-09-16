/*
 Endpoint to create a new user
*/

//packages
import { apiHandler } from "@functions/api/APIHandler";

//functions
import { checkUserExists, createUser } from "@functions/dataFetching";

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
  const user = await checkUserExists(email);

  if (user) throw "User already exists";

  //create user
  const createdUser = await createUser(email, password);
  console.log(createdUser);

  return res.status(201).json({ result: createdUser });
}
