import { Router } from "express";
import editProfileController from "../../controllers/profile/edit-profile";
import authMiddleware from "../../middlewares/auth";
import { asyncHandler } from "../../utils/async-handler";

const editProfileRoute: Router = Router();

editProfileRoute.patch(
  "/edit",
  authMiddleware,
  asyncHandler(editProfileController),
);

export default editProfileRoute;
