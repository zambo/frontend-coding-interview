"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signInAction } from "@/lib/actions";
import { Input } from "@/components/ui/base/input";
import { SubmitButton } from "./SubmitButton";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/base/form";
import { signInSchema, type SignInFormData } from "@/lib/validation";

export function SignInForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const [generalError, setGeneralError] = useState<string>("");

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: SignInFormData) => {
    setGeneralError("");

    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("password", data.password);
      await signInAction(formData);
    } catch (error) {
      setGeneralError(
        error instanceof Error
          ? error.message
          : "An error occurred during sign in"
      );
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn("space-y-8", props.className)}
      >
        {generalError && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
            {generalError}
          </div>
        )}

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Username</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-sm font-bold">Password</FormLabel>
                <a
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:underline"
                  tabIndex={0}
                >
                  Forgot password?
                </a>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton />
      </form>
    </Form>
  );
}
