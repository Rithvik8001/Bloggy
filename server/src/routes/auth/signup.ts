import { Router } from "express";
import signupController from "../../controllers/auth/signup";

const signupRoute: Router = Router();

signupRoute.post("/signup", signupController);

export { signupRoute };
