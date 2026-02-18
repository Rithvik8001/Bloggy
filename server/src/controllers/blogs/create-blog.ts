import { Request, Response } from "express";
import createBlogValidation from "../../validations/blogs/create-blog";
import db from "../../db/config/connection";
import { blogsTable } from "../../db/models/blog";
import {
  InternalServerError,
  UnauthorizedError,
  ValidationError,
} from "../../errors/index.js";

export default async function createBlogController(
  req: Request,
  res: Response,
) {
  const userId = req.userId;
  if (!userId) {
    throw new UnauthorizedError("Unauthorized access");
  }

  const result = createBlogValidation(req.body);
  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  const { title, description } = result.data;
  try {
    const [newBlog] = await db
      .insert(blogsTable)
      .values({
        userId,
        title,
        description,
      })
      .returning({
        id: blogsTable.id,
        title: blogsTable.title,
        description: blogsTable.description,
        createdAt: blogsTable.createdAt,
        updatedAt: blogsTable.updatedAt,
      });

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    throw new InternalServerError("Failed to create blog");
  }
}
