import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token manquant" });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { userId: string; role: string };

    req.auth = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };

    next();
  } catch (error: any) {
    res.status(401).json({
      message: "Token invalide",
      error: error.message,
    });
  }
};

export default auth;
