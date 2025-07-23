import { cookies } from "next/headers";
import { User } from "@/types/auth";

export const authUtils = {
  getCurrentUser: async (): Promise<User | null> => {
    const cookieStore = await cookies();
    const userData = cookieStore.get("user-data");

    if (!userData) return null;

    try {
      return JSON.parse(userData.value);
    } catch {
      return null;
    }
  },

  isAuthenticated: async (): Promise<boolean> => {
    const cookieStore = await cookies();
    return !!cookieStore.get("auth-token");
  },
};
