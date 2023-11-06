import { NextFunction, Request, Response } from "express";

const sampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Sample Middleware");

  next();
};

export { sampleMiddleware };
