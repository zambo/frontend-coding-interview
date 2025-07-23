export const API_BASE_URL = process.env.PEXELS_API_URL || "";
export const API_KEY = process.env.PEXELS_API_KEY || "";

export const API_ENDPOINTS = {
  PEXELS_SEARCH: "/search",
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: "clever_auth_token",
  USER_DATA: "clever_user_data",
} as const;

export const ROUTES = {
  HOME: "/",
  SIGNIN: "/signin",
  PHOTOS: "/photos",
} as const;
