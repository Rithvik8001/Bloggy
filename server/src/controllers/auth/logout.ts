import { Request, Response } from "express";
import { InternalServerError } from "../../errors/index.js";

export default async function logoutController(req: Request, res: Response) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout error:", error);
    throw new InternalServerError("Failed to logout");
  }
}
