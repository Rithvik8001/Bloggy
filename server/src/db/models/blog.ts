import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { usersTable } from "./user";
import { InferSelectModel, relations } from "drizzle-orm";

// one to many relationship between users and blogs

export const blogsTable = sqliteTable("blogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updatedAt", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type Blog = InferSelectModel<typeof blogsTable>;
