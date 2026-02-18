import { Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  ValidationError,
} from "../../errors/index.js";
import editProfileValidation from "../../validations/profile/edit-profile.js";
import db from "../../db/config/connection.js";
import { usersTable } from "../../db/models/user.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { formatUserDates } from "../../utils/user.js";

export default async function editProfileController(
  req: Request,
  res: Response,
) {
  const userId = req.userId;
  if (!userId) {
    throw new UnauthorizedError("Unauthorized Access.");
  }

  const result = editProfileValidation(req.body);
  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  const { userName, password } = result.data;

  if (userName === undefined && password === undefined) {
    throw new BadRequestError(
      "Provide at least one field to update (userName or password)",
    );
  }

  const updateData: Partial<{ userName: string; password: string }> = {};
  if (userName !== undefined) updateData.userName = userName;
  if (password !== undefined) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  try {
    const [updatedUser] = await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.id, userId))
      .returning({
        id: usersTable.id,
        userName: usersTable.userName,
        email: usersTable.email,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      });

    if (!updatedUser) {
      throw new BadRequestError("User not found");
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      user: formatUserDates(updatedUser),
    });
  } catch (error) {
    if (error instanceof BadRequestError) throw error;
    console.error("Edit profile error:", error);
    throw new InternalServerError("Failed to update profile");
  }
}
