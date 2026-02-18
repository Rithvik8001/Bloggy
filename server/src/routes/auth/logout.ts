import { Router } from "express";
import logoutController from "../../controllers/auth/logout";
import { asyncHandler } from "../../utils/async-handler.js";

const logoutRoute: Router = Router();

logoutRoute.post("/logout", asyncHandler(logoutController));

export { logoutRoute };
