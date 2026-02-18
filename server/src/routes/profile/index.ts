import { Router } from "express";
import meRoute from "./me.js";

const route: Router = Router();

route.use("/", meRoute);

export default route;
