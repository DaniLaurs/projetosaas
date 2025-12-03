import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { AppDataSource } from "./services/data-source";

import authRoutes from "./routes/authRoute";
import planRoutes from "./routes/planRoutes";
import taskRoutes from "./routes/taskRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

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
