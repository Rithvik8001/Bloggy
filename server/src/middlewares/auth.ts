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

function getTokenFromRequest(req: Request): string | undefined {
  const cookieToken = req.cookies?.token;
  if (cookieToken) return cookieToken;
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
  return undefined;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = getTokenFromRequest(req);
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
