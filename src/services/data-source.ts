import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Task } from "../entities/Task";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // só em dev
  logging: false,
  entities: [User, Task],
  ssl: {
    rejectUnauthorized: false,
  },
});
