import "dotenv/config";
import express, { Express } from "express";
import { checkDatabaseConnection } from "./db/config/connection.js";

const app: Express = express();
const PORT = process.env.PORT;

import authRoute from "./routes/auth/index.js";

app.use("/api/v1/auth", authRoute);

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
