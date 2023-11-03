import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";

if (!process.env.SECRET) {
  throw new Error("SECRET environment variable is not defined");
}
const createToken = (_id: any) => {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3d" });
};

// login user
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
