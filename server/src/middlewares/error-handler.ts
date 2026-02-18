import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/index.js";

export default function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    const payload: { error: string; message: string; details?: unknown } = {
      error: err.error,
      message: err.message,
    };
    if (err.details !== undefined) {
      payload.details = err.details;
    }
    if (err.statusCode === 500 && process.env.NODE_ENV === "production") {
      delete payload.details;
    }
    res.status(err.statusCode).json(payload);
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: "Something went wrong",
    ...(process.env.NODE_ENV === "development" && {
      details: err instanceof Error ? err.message : "Unknown error",
    }),
  });
}
