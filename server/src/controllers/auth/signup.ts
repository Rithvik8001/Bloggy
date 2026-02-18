import { Request, Response } from "express";
import signupValidation from "../../validations/auth/signup";
import db from "../../db/config/connection";
import { usersTable } from "../../db/models/user";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { formatUserDates } from "../../utils/user";
import {
  BadRequestError,
  InternalServerError,
  ValidationError,
} from "../../errors/index.js";

export default async function signupController(req: Request, res: Response) {
  const result = signupValidation(req.body);
  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  const { userName, email, password } = result.data;

  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    throw new BadRequestError(
      "User already exists, please try a different email or login instead",
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db
      .insert(usersTable)
      .values({
        userName,
        email,
        password: hashedPassword,
      })
      .returning({
        id: usersTable.id,
        userName: usersTable.userName,
        email: usersTable.email,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      });

    return res.status(201).json({
      message: "User created successfully",
      user: formatUserDates(newUser),
    });
  } catch (error) {
    console.error("Signup error:", error);
    throw new InternalServerError("Failed to create user");
  }
}
