import { Router } from "express";
import meRoute from "./me.js";
import editProfileRoute from "./edit-profile.js";

const route: Router = Router();

route.use("/", meRoute);
route.use("/", editProfileRoute);

export default route;
