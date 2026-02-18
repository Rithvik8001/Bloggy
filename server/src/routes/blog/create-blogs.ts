import { Router } from "express";
import createBlogController from "../../controllers/blogs/create-blog";
import authMiddleware from "../../middlewares/auth";
import { asyncHandler } from "../../utils/async-handler.js";

const createBlogsRoute: Router = Router();

createBlogsRoute.post(
  "/create",
  authMiddleware,
  asyncHandler(createBlogController),
);

export default createBlogsRoute;
