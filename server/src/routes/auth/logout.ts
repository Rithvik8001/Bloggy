import { Router } from "express";
import logoutController from "../../controllers/auth/logout";

const logoutRoute: Router = Router();

logoutRoute.post("/logout", logoutController);

export { logoutRoute };
