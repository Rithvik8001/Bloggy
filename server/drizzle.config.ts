import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/models/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: `file:${process.env.DB_FILE_NAME || "bloggy.db"}`,
  },
});
