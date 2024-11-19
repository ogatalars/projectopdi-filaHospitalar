// src/seed.ts
import { createConnection } from "typeorm";
import { Hospital } from "./models/Hospital";
import { Queue } from "./models/Queue";

createConnection()
  .then(async (connection) => {
    const hospitalRepository = connection.getRepository(Hospital);
    const queueRepository = connection.getRepository(Queue);

    // Criar um hospital de exemplo
    const hospital = new Hospital();
    hospital.nome = "Hospital Exemplar";
    hospital.endereco = "Rua Exemplo, 123";
    hospital.telefone = "(11) 98765-4321";
    await hospitalRepository.save(hospital);

    // Criar uma fila para o hospital
    const fila = new Queue();
    fila.hospital = hospital;
    fila.tempoEspera = 45; // em minutos
    fila.pacientesNaFila = 20;
    await queueRepository.save(fila);

    console.log("Dados iniciais inseridos com sucesso!");
    process.exit(0);
  })
  .catch((error) => console.log(error));
