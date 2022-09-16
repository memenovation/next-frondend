import prisma from "@configs/prisma";
const bcrypt = require("bcrypt");

//check if user already exists with prisma
export const checkUserExists = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};

//create user with prisma
export const createUser = async (email, password) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      password: await bcrypt.hash(password, 12),
    },
  });
  return user;
};

//login user with prisma
export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
    },
  });
  if (!user) {
    console.log("user not found");
    throw new Error("User not found");
  }
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    console.log("password incorrect");
    throw new Error("Incorrect password");
  }
  return user;
};
