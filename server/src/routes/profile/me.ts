import { Router } from "express";
import authMiddleware from "../../middlewares/auth.js";
import { asyncHandler } from "../../utils/async-handler.js";
import userProfileController from "../../controllers/profile/user-profile.js";

const meRoute: Router = Router();

meRoute.get("/me", authMiddleware, asyncHandler(userProfileController));

export default meRoute;
