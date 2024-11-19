// src/data-source.ts
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";
import { Hospital } from "./models/Hospital";
import { Queue } from "./models/Queue";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Hospital, Queue],
  synchronize: true,
  logging: true,
});
