export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const AVAILABLE_ENDPOINTS = {
  auth: {
    login: "/api/v1/auth/login",
    me: "/api/v1/auth/me",
    logout: "/api/v1/auth/logout",
  },
  users: {
    list: "/api/v1/users",
    create: "/api/v1/users",
    getById: (id: string) => `/api/v1/users/${id}`,
    update: (id: string) => `/api/v1/users/${id}`,
    delete: (id: string) => `/api/v1/users/${id}`,
  },
} as const;
