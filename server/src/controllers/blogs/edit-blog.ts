import { Request, Response } from "express";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
  ValidationError,
} from "../../errors/index.js";
import db from "../../db/config/connection.js";
import { blogsTable } from "../../db/models/blog.js";
import { eq } from "drizzle-orm";
import editBlogValidation from "../../validations/blogs/edit-blog.js";

export default async function editBlogController(req: Request, res: Response) {
  const userId = req.userId;
  if (!userId) {
    throw new UnauthorizedError("Unauthorized access");
  }
  const { id } = req.params;

  // check if the blog exists
  const isBlogExists = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, id as string));
  if (isBlogExists.length === 0) {
    throw new BadRequestError("Blog does not exist");
  }

  const result = editBlogValidation(req.body);
  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  // user can just edit the title or description or both
  const { title, description } = result.data;

  try {
    // Build update object with only provided fields
    const updateData: Partial<{ title: string; description: string }> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;

    // Single update operation
    const [updatedBlog] = await db
      .update(blogsTable)
      .set(updateData)
      .where(eq(blogsTable.id, id as string))
      .returning({
        id: blogsTable.id,
        title: blogsTable.title,
        description: blogsTable.description,
        createdAt: blogsTable.createdAt,
        updatedAt: blogsTable.updatedAt,
      });

    return res.status(200).json({
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    console.error("Edit blog error:", error);
    throw new InternalServerError("Failed to update blog");
  }
}
