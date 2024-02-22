"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTransition } from "react";
import { deleteTodo, updateTodoStatus } from "@/app/actions";
import { SelectTodo } from "@/lib/db/schema";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type TodoProps = {
  index: number;
  todo: SelectTodo;
};

function TodoList({ todo, index }: TodoProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <li className="flex items-center gap-3 p-4 border-b justify-between">
      <div className="space-x-3 flex items-center">
        <Checkbox
          id={todo?.title}
          defaultChecked={todo?.done}
          onCheckedChange={(checked: boolean) => {
            startTransition(async () => {
              await updateTodoStatus(todo?.id, checked);
              toast({
                title: "Your todo status has been updated",
                description: `Todo ${index} has been marked as ${
                  checked ? "done" : "not done"
                }`,
              });
            });
          }}
        />
        <label
          htmlFor={todo?.title}
          className="flex items-center gap-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <span>{index}.</span>
          <span>{todo?.title}</span>
        </label>
      </div>
      <Button
        onClick={async () => {
          await deleteTodo(todo?.id);
          toast({
            title: "Todo has been deleted.",
            variant: "destructive",
          });
        }}
        variant="ghost"
      >
        <Trash className="w-4 h-4 text-destructive stroke-2" />
      </Button>
    </li>
  );
}

export default TodoList;
