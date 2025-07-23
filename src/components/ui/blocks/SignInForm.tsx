"use client";

import { useState } from "react";
import { signInAction } from "@/lib/actions";
import { Input } from "@/components/ui/base/input";
import { Label } from "@/components/ui/base/label";
import { SubmitButton } from "./SubmitButton";
import { cn } from "@/lib/utils";

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

export function SignInForm(props: React.HTMLAttributes<HTMLFormElement>) {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = async (formData: FormData) => {
    setErrors({});

    // Client-side validation
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const newErrors: FormErrors = {};

    if (!username) {
      newErrors.username = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      newErrors.username = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await signInAction(formData);
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "An error occurred during sign in",
      });
    }
  };

  return (
    <form action={handleSubmit} className={cn("space-y-8", props.className)}>
      {errors.general && (
        <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded">
          {errors.general}
        </div>
      )}

      <div className="grid gap-3">
        <Label htmlFor="username" className="text-sm font-bold">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          type="email"
          placeholder="Enter your email"
          required
          aria-invalid={!!errors.username}
        />
        {errors.username && (
          <p className="text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-bold">
            Password
          </Label>
          <a
            href="/forgot-password"
            className="text-xs text-blue-600 hover:underline"
            tabIndex={0}
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <SubmitButton />
    </form>
  );
}
