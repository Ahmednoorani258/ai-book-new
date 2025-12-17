import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://ai-book-new.onrender.com", // Your backend URL
  fetchOptions: {
    credentials: "include",
  },
});
