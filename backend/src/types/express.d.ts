import { Request } from "express";

export interface AuthPayload {
  userId: string;
  role: string;
}

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthPayload;
  }
}

declare namespace Express {
  interface Request {
    auth?: {
      userId: string;
      role: string;
    };
  }
}

