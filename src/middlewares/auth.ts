import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      return res.json({
        message: "AUTH_REQUIRED",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.json({
        message: "AUTH_REQUIRED",
      });
    }

    const tokenDecoded = jwt.verify(token, "secreto");

    req.token = tokenDecoded;

    next();
  } catch (error) {
    return res.json({
      error: "Not auth",
    });
  }
};

export { auth };
