import { Router } from "express";
import signupController from "../../controllers/auth/signup";
import { asyncHandler } from "../../utils/async-handler.js";

const signupRoute: Router = Router();

signupRoute.post("/signup", asyncHandler(signupController));

export { signupRoute };
