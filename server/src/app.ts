import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from "express";
import { checkDatabaseConnection } from "./db/config/connection.js";
import errorHandler from "./middlewares/error-handler.js";

const app: Express = express();
const PORT = process.env.PORT;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoute from "./routes/auth/index.js";
import blogRoute from "./routes/blog/index.js";
import cors from "cors";

// cors
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/blogs", blogRoute);

// json parser
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON",
      message: "Please send a valid JSON object",
    });
  }
  next(err);
});

// error handler
app.use(errorHandler);

const startServer = async () => {
  try {
    const databaseConnection = await checkDatabaseConnection();
    if (!databaseConnection) {
      throw new Error("Database connection failed");
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
