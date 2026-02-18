import { Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../../errors/index.js";
import db from "../../db/config/connection";
import { usersTable } from "../../db/models/user.js";
import { eq } from "drizzle-orm";

export default async function userProfileController(
  req: Request,
  res: Response,
) {
  const userId = req.userId;
  if (!userId) {
    throw new UnauthorizedError("Unauthorized access");
  }
  try {
    // get the user profile
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);
    if (user.length === 0) {
      throw new BadRequestError("User not found");
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      user: user[0],
    });
  } catch (error) {
    console.error("Get user profile error:", error);
    throw new InternalServerError("Failed to get user profile");
  }
}
