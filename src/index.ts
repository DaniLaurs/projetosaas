import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./services/data-source";

import authRoutes from "./routes/authRoute";
import planRoutes from "./routes/planRoutes";
import taskRoutes from "./routes/taskRoute";

dotenv.config();

const app = express();

// Configuração CORS para dev local e Vercel
const allowedOrigins = [
  "http://localhost:5173", // desenvolvimento local
  "https://projetosaasfront-z6nl.vercel.app" // frontend deploy Vercel
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/tasks", taskRoutes);

console.log("Iniciando backend...");

AppDataSource.initialize()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Data Source init error:", err));
