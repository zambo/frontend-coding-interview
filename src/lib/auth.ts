import { User, LoginCredentials } from "@/types/auth";
import { STORAGE_KEYS } from "./constants";

export const authUtils = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    // TODO: Replace with actual auth logic
    const mockUser: User = {
      id: "1",
      email: credentials.email,
      name: "Mock User",
    };

    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, "mock_token");

    return mockUser;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  getCurrentUser: (): User | null => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return savedUser ? JSON.parse(savedUser) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};
