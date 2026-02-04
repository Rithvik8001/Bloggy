import { Request, Response } from "express";
import signupValidation from "../../validations/auth/signup";
import db from "../../db/config/connection";
import { usersTable } from "../../db/models/user";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { formatUserDates } from "../../utils/user";

export default async function signupController(req: Request, res: Response) {
  const result = signupValidation(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "Validation failed",
      details: result.error.issues,
    });
  }

  const { userName, email, password } = result.data;

  try {
    // check if the user already exists
    const existingUser = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(400).json({
        error:
          "User already exists, please try a different email or login instead",
      });
    }

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
    return res.status(500).json({
      error: "Internal server error",
      message: "Failed to create user",
    });
  }
}
