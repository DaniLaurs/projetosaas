import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Task } from "../entities/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql", // ✅ trocado de postgres para mysql (ou mariadb)
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "saasdb",
  synchronize: true, // ⚠️ só em desenvolvimento
  logging: false,
  entities: [User, Task],
});
