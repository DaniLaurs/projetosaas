import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Task } from "../entities/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,

  ssl: {
    rejectUnauthorized: false, // 🔥 OBRIGATÓRIO para Supabase no Render
  },

  synchronize: true, // ⚠️ só enquanto estiver desenvolvendo
  logging: false,
  entities: [User, Task],
});
