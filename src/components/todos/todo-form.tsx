"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { createTodo } from "@/app/actions";

const todoFormSchema = z.object({
  title: z.string(),
});

type TodoFormValues = z.infer<typeof todoFormSchema>;

const defaultValues: Partial<TodoFormValues> = {
  title: "",
};

export function TodoForm() {
  const { toast } = useToast();
  const form = useForm<TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues,
  });

  async function onSubmit(values: TodoFormValues) {
    await createTodo({
      title: values.title,
    });
    toast({
      title: "Your todo has been created.",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-4"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full max-w-lg">
              <FormLabel>Create a New Todo</FormLabel>
              <FormControl>
                <Input placeholder="Enter your todo here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
