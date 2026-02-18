import { Router } from "express";
import authMiddleware from "../../middlewares/auth";
import { asyncHandler } from "../../utils/async-handler.js";
import deleteBlogController from "../../controllers/blogs/delete-blog.js";

const deleteBlogRoute: Router = Router();

deleteBlogRoute.delete(
  "/delete/:id",
  authMiddleware,
  asyncHandler(deleteBlogController),
);

export default deleteBlogRoute;
