import { Request, Response, NextFunction, RequestHandler } from "express";
import { Hospital } from "../models/Hospital";
import { AppDataSource } from "../data-source";

class HospitalController {
  static listAll: RequestHandler = async (req, res, next) => {
    try {
      const hospitalRepository = AppDataSource.getRepository(Hospital);
      const hospitais = await hospitalRepository.find();
      res.json(hospitais);
    } catch (error) {
      next(error);
    }
  };

  static getOneById: RequestHandler = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const hospitalRepository = AppDataSource.getRepository(Hospital);
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
}

export default HospitalController;
