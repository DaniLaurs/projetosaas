import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Task } from "../entities/Task";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true, // só enquanto desenvolve
  logging: false,
  entities: [User, Task],
  ssl: {
    rejectUnauthorized: false,
  },
});
