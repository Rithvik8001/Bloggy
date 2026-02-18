import { Router } from "express";
import createBlogsRoute from "./create-blog";
import editBlogsRoute from "./edit-blog";
import deleteBlogsRoute from "./delete-blog";

const route: Router = Router();

route.use("/", createBlogsRoute);
route.use("/", editBlogsRoute);
route.use("/", deleteBlogsRoute);

export default route;
