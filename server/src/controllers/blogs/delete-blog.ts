import { Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../../errors/AppError";
import db from "../../db/config/connection";
import { blogsTable } from "../../db/models/index";
import { eq } from "drizzle-orm";

export default async function deleteBlogController(
  req: Request,
  res: Response,
) {
  const userId = req.userId;
  if (!userId) {
    throw new UnauthorizedError("Unauthorized access");
  }
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("Blog ID is required");
  }
  try {
    // check if the blog exists
    const isBlogExists = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id as string))
      .limit(1);
    if (isBlogExists.length === 0) {
      throw new BadRequestError("Blog does not exist");
    }
    // check if the blog belongs to the user
    if (isBlogExists[0].userId !== userId) {
      throw new UnauthorizedError("You are not authorized to delete this blog");
    }
    // delete the blog
    const deletedBlog = await db
      .delete(blogsTable)
      .where(eq(blogsTable.id, id as string))
      .returning({
        id: blogsTable.id,
        title: blogsTable.title,
        description: blogsTable.description,
        createdAt: blogsTable.createdAt,
        updatedAt: blogsTable.updatedAt,
      });
    if (deletedBlog.length === 0) {
      throw new InternalServerError("Failed to delete blog");
    }
    return res.status(200).json({
      message: "Blog deleted successfully",
      blog: deletedBlog[0],
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    throw new InternalServerError("Failed to delete blog");
  }
}
