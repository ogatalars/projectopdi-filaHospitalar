import { Request, Response, NextFunction, RequestHandler } from "express";
import { getRepository } from "typeorm";
import { Queue } from "../models/Queue";
import { AppDataSource } from "../data-source";

class QueueController {
  static getByHospitalId: RequestHandler = async (req, res, next) => {
    try {
      const hospitalId = parseInt(req.params.hospitalId, 10);
      const queueRepository = AppDataSource.getRepository(Queue);
      const fila = await queueRepository.find({
        where: { hospital: { id: hospitalId } },
        relations: ["hospital"],
      });

      res.json(fila);
    } catch (error) {
      next(error);
    }
  };

  // Métodos para atualizar as informações da fila podem ser adicionados aqui
}

export default QueueController;
