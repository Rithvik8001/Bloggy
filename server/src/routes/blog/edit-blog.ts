import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import { asyncHandler } from "../../utils/async-handler.js";
import editBlogController from "../../controllers/blogs/edit-blog.js";

const editBlogRoute: Router = Router();

editBlogRoute.put(
  "/edit/:id",
  authMiddleware,
  asyncHandler(editBlogController),
);

export default editBlogRoute;
