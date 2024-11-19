import { Request, Response, NextFunction, RequestHandler } from "express";
import { getRepository } from "typeorm";
import { Hospital } from "../models/Hospital";

class HospitalController {
  static listAll: RequestHandler = async (req, res, next) => {
    try {
      const hospitalRepository = getRepository(Hospital);
      const hospitais = await hospitalRepository.find();
      res.json(hospitais);
    } catch (error) {
      next(error);
    }
  };

  static getOneById: RequestHandler = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const hospitalRepository = getRepository(Hospital);
      const hospital = await hospitalRepository.findOne({ where: { id } });

      if (!hospital) {
        res.status(404).json({ message: "Hospital não encontrado" });
        return;
      }

      res.json(hospital);
    } catch (error) {
      next(error);
    }
  };

  // Métodos para criar, atualizar e deletar hospitais podem ser adicionados aqui
}

export default HospitalController;
