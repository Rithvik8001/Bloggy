import { Router } from "express";
import createBlogsRoute from "./create-blogs";

const route: Router = Router();

route.use("/", createBlogsRoute);

export default route;
