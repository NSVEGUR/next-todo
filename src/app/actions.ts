"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { CreateTodo, todo } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

export async function createTodo(data: CreateTodo) {
  await db.insert(todo).values(data);
  revalidatePath("/");
}

export async function updateTodoStatus(id: string, done: boolean) {
  await db
    .update(todo)
    .set({ done })
    .where(sql`${todo.id} = ${id}`);
  revalidatePath("/");
}

export async function deleteTodo(id: string) {
  await db.delete(todo).where(sql`${todo.id} = ${id}`);
  revalidatePath("/");
}
