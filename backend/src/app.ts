import express from "express";
import cors from "cors";
import apiRoutes from "./api";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: true,      // allow frontend
  credentials: true // allow cookies/session
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "AI Book Backend API",
    status: "running",
    endpoints: {
      auth: "/api/auth",
      api: "/api/v1"
    }
  });
});

// Better Auth handler - use middleware mounting
app.use("/api/auth", (req, res) => {
  return toNodeHandler(auth)(req, res);
});

app.use("/api/v1", apiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
