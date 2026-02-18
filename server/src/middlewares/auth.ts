import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return next(new UnauthorizedError("Unauthorized access"));
    }
    const jwtSecret = process.env.JWT_SECRET as string;
    const verifyJwt = jwt.verify(token, jwtSecret) as {
      userId: string;
    };
    req.userId = verifyJwt.userId;

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new UnauthorizedError("Invalid token."));
    }
    if (err instanceof jwt.TokenExpiredError) {
      return next(new UnauthorizedError("Token expired. Please login again."));
    }
    return next(new UnauthorizedError("Invalid token."));
  }
}
