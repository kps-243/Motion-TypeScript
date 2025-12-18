import { Request, Response, NextFunction } from "express";

const checkRoles =
  (...allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth || !allowedRoles.includes(req.auth.role)) {
      return res
        .status(403)
        .json({ message: "Accès interdit : rôle insuffisant" });
    }

    next();
  };

export default checkRoles;
