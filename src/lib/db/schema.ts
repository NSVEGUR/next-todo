import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const todo = sqliteTable("todo", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title").notNull(),
  done: integer("done", { mode: "boolean" }).default(false).notNull(),
  order: integer("order").default(0).notNull(),
});

export type SelectTodo = InferSelectModel<typeof todo>;
export type CreateTodo = InferInsertModel<typeof todo>;
