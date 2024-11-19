import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { errorHandler } from "./middleware/errorHandle";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

import routes from "./routes";
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
app.use(errorHandler);

createConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
