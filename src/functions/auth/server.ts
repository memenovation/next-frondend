//auth logic for the app

//custom login logic here, call in api
export const signInUser = async (email: string, password: string) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  //Check if user exists
  if (!email || !password) {
    throw new Error("Please enter your email and password");
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    throw new Error("Incorrect email or password");
  }
  console.log("successful login");

  return {
    id: "1",
    name: "Admin",
    email: email,
    role: "admin",
  };
};
