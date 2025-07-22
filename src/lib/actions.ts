"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

const signInSchema = z.object({
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function signInAction(formData: FormData): Promise<void> {
  const result = signInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!result.success) {
    throw new Error("Invalid form data");
  }

  const { username, password } = result.data;

  // Mock authentication - in real app, verify against database
  if (username && password.length >= 6) {
    // Set secure httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("auth-token", "mock-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    cookieStore.set(
      "user-data",
      JSON.stringify({
        id: "1",
        email: username,
        name: "Mock User",
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
      }
    );

    redirect("/photos");
  } else {
    throw new Error("Invalid credentials");
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
  cookieStore.delete("user-data");
  redirect("/signin");
}
