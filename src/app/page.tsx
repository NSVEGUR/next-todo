import { TodoForm } from "@/components/todos/todo-form";
import TodoList from "@/components/todos/todo-list";

import { db } from "@/lib/db";
import { todo } from "@/lib/db/schema";

async function getTodos() {
  const todos = await db.select().from(todo);
  return {
    todos,
  };
}

export default async function IndexPage() {
  const { todos } = await getTodos();

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Next Todo App.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Create your Todo list.
        </p>
      </div>
      <TodoForm />
      <ul className="flex h-full w-full flex-col overflow-hidden bg-popover text-popover-foreground rounded-lg border shadow-md">
        {todos?.map((todo, index) => (
          <TodoList key={todo?.id} todo={todo} index={index + 1} />
        ))}
      </ul>
    </section>
  );
}
