import { pgTable, text, varchar } from "drizzle-orm/pg-core";

export const tbl_users = pgTable("tbl_users", {
  id: varchar("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});
