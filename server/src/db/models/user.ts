import { InferSelectModel, sql } from "drizzle-orm";
import { check, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export const usersTable = sqliteTable(
  "users",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    userName: text("user_name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => ({
    userNameLengthCheck: check(
      "user_name_length_check",
      sql`length(${table.userName}) >= 6 AND length(${table.userName}) <= 50`,
    ),
  }),
);

export type User = InferSelectModel<typeof usersTable>;
