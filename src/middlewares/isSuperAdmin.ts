import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {

  if (req.token.role !== "super_admin") {
    return res.json('User not authorized')
  }

  next();
}

export { isSuperAdmin }