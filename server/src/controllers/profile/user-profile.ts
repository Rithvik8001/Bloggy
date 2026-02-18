import { Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../../errors/index.js";
import db from "../../db/config/connection.js";
import { usersTable } from "../../db/models/user.js";
import { eq } from "drizzle-orm";
import { formatUserDates } from "../../utils/user.js";

export default async function userProfileController(
  req: Request,
  res: Response,
) {
  const userId = req.userId;
  if (!userId) {
    throw new UnauthorizedError("Unauthorized access");
  }
  try {
    const [user] = await db
      .select({
        id: usersTable.id,
        userName: usersTable.userName,
        email: usersTable.email,
        createdAt: usersTable.createdAt,
        updatedAt: usersTable.updatedAt,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      user: formatUserDates(user),
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    throw new InternalServerError("Failed to get user profile");
  }
}
