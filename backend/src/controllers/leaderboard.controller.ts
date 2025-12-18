import { Request, Response } from "express";
import User from "../models/User";

export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const top = await User.find()
                          .select("name firstName email role score")
                          .sort({ score: -1 })
                          .limit(20);

    return res.status(200).json(top);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
