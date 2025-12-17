import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:8000", // Your backend URL
  fetchOptions: {
    credentials: "include",
  },
});
