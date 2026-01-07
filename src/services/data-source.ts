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

  // 🔥 FORÇA IPv4 + SSL (RESOLVE O ENETUNREACH)
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
    family: 4, // 👈 ISSO resolve o IPv6
  },

  synchronize: true,
  logging: false,
  entities: [User, Task],
});
