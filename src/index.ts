import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { AppDataSource } from "./services/data-source";

import authRoutes from "./routes/authRoute";
import planRoutes from "./routes/planRoutes";
import taskRoutes from "./routes/taskRoute";


const app = express();

/* ✅ CORS COMPATÍVEL COM RENDER + VITE */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://projetosaasfront-z6nl.vercel.app",
    ],
    methods: ["GET", "POST", "PUT","PATCH" ,"DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/tasks", taskRoutes);

console.log("Iniciando backend...");

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("Data Source init error:", err));
