import { Router } from "express";
import loginController from "../../controllers/auth/login";

const loginRoute: Router = Router();

loginRoute.post("/login", loginController);

export { loginRoute };
