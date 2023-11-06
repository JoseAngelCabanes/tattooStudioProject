import { NextFunction, Request, Response } from "express";

const admin = (req: any, res: Response, next: NextFunction) => {
  if (req.token.role !== "super_admin" && req.token.role !== "admin") {
    return res.json("User not authorized");
  }

  next();
};

export { admin };
