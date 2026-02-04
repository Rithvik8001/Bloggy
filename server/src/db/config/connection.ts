import "dotenv/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// create a client instance to connect to the database
const client = createClient({
  url: `file:${process.env.DB_FILE_NAME || "bloggy.db"}`,
});

// create a drizzle instance to interact with the database
const db = drizzle(client);

// check if the database connection is successful
export const checkDatabaseConnection = async (): Promise<boolean> => {
  try {
    // execute a query to check if the database connection is successful - SELECT 1 is a valid query that will return a result
    await client.execute("SELECT 1");
    console.log("Database connection successful!");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
};

export default db;
