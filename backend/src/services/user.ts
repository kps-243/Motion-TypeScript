import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

dotenv.config();

interface SignupData {
  name: string;
  firstName: string;
  email: string;
  password: string;
  role?: string;
}

export const signup = async (
  userData: SignupData
): Promise<{ message: string }> => {
  const { name, firstName, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Cet email est déjà utilisé.");
  }

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    firstName,
    email,
    password: hash,
    role,
  });

  await user.save();

  return { message: "Utilisateur créé avec succès" };
};

export const login = async (
  email: string,
  password: string
): Promise<{ userId: string; token: string }> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Paire login/mot de passe incorrecte");
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error("Paire login/mot de passe incorrecte");
  }
  

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
  throw new Error("JWT_SECRET non défini");
}
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    jwtSecret as string,
    { expiresIn: "24h" }
  );

  return {
    userId: user._id.toString(),
    token,
  };
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await User.find();
};

export const getOneUser = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const modifyUser = async (
  id: string,
  data: Partial<IUser>
) => {
  return await User.updateOne({ _id: id }, { ...data, _id: id });
};

export const deleteUser = async (id: string) => {
  return await User.deleteOne({ _id: id });
};
