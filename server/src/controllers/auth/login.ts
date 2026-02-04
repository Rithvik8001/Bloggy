import { Request, Response } from "express";
import loginValidation from "../../validations/auth/login";
import db from "../../db/config/connection";
import { usersTable } from "../../db/models";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";

export default async function loginController(req: Request, res: Response) {
  const result = loginValidation(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues,
    });
  }

  const { email, password } = result.data;
  try {
    // check if user exists
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (user.length === 0) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // compare the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const payload = {
      userId: user[0].id,
      email: user[0].email,
    };

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET environment variable is not set");
    }

    const token = jwt.sign(payload, jwtSecret as Secret, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to login",
      details:
        process.env.NODE_ENV === "development" ? errorMessage : undefined,
    });
  }
}
