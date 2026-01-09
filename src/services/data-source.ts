import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Task } from "../entities/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // ⚠️ somente em desenvolvimento
  logging: false,
  entities: [User, Task],
  ssl: {
    rejectUnauthorized: false, // ✅ ISSO resolve o erro do certificado
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
