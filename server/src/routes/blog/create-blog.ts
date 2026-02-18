import { Router } from "express";
import createBlogController from "../../controllers/blogs/create-blog";
import authMiddleware from "../../middlewares/auth";
import { asyncHandler } from "../../utils/async-handler.js";

const createBlogRoute: Router = Router();

createBlogRoute.post(
  "/create",
  authMiddleware,
  asyncHandler(createBlogController),
);

export default createBlogRoute;
