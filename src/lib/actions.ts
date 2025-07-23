"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";
import { API_BASE_URL, API_KEY, API_ENDPOINTS } from "@/lib/constants";
import type { PexelsResponse } from "@/types/photo";

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

export async function fetchPhotosAction(
  query: string = "nature",
  perPage: number = 10
): Promise<
  { success: true; data: PexelsResponse } | { success: false; error: string }
> {
  try {
    // Validate environment variables
    if (!API_BASE_URL || !API_KEY || API_KEY === "your_pexels_api_key_here") {
      return {
        success: false,
        error:
          "Pexels API is not properly configured. Please check your environment variables.",
      };
    }

    const res = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.PEXELS_SEARCH}?query=${encodeURIComponent(query)}&per_page=${perPage}`,
      {
        headers: {
          Authorization: API_KEY,
        },
        next: {
          revalidate: 3600, // Cache for 1 hour
        },
      }
    );

    if (!res.ok) {
      if (res.status === 401) {
        return {
          success: false,
          error: "Invalid API key. Please check your Pexels API configuration.",
        };
      }
      if (res.status === 429) {
        return {
          success: false,
          error: "Rate limit exceeded. Please try again later.",
        };
      }
      return {
        success: false,
        error: `Failed to fetch photos: ${res.status} ${res.statusText}`,
      };
    }

    const data: PexelsResponse = await res.json();

    if (!data.photos || data.photos.length === 0) {
      return {
        success: false,
        error: "No photos found for this search query.",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error fetching photos:", error);
    return {
      success: false,
      error: "An unexpected error occurred while fetching photos.",
    };
  }
}
