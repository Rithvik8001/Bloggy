import { Router } from "express";
import loginController from "../../controllers/auth/login";
import { asyncHandler } from "../../utils/async-handler.js";

const loginRoute: Router = Router();

loginRoute.post("/login", asyncHandler(loginController));

export { loginRoute };
