// src/index.ts
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

app.use(express.static(path.join(__dirname, "../public")));

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializado com sucesso.");

    // Servir arquivos estáticos após inicializar o Data Source
    app.use(express.static(path.join(__dirname, "../public")));

    // Usar as rotas
    app.use("/", routes);

    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log("Erro ao inicializar o Data Source", error));
