"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Comment } from "./comment-table";

const formSchema = z.object({
  name: z.string().nonempty({
    message: "Name required",
  }),
  email: z
    .string()
    .email({
      message: "Invalid email",
    })
    .nonempty({
      message: "Email required",
    }),
  body: z.string().nonempty({ message: "Body required" }),
});

export function NewCommentForm({ onSubmit: handleSubmit }: { onSubmit: (values: Comment) => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      body: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSubmit({
      id: 0,
      postId: 1,
      name: values.name,
      email: values.email,
      body: values.body,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Body" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
