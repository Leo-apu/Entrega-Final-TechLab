import bcrypt from "bcrypt";

import { createUserModel, getUserByEmailModel } from "../models/user.model.js";

export const registerUserService = async (email, password, role) => {
  const existingUser = await getUserByEmailModel(email);

  if (existingUser) {
    return null;
  }

  const validRoles = ["admin", "employee"];

  if (!validRoles.includes(role)) {
    throw new Error("Rol inválido");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    email,
    password: hashedPassword,
    role,
    createdAt: new Date().toISOString(),
  };

  const id = await createUserModel(newUser);

  return {
    id,
    email,
    role,
  };
};

export const validateUser = async (email, password) => {
  const user = await getUserByEmailModel(email);

  if (!user) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return user;
};
