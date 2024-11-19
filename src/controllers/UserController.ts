// src/controllers/UserController.ts
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
import * as bcrypt from "bcryptjs";

class UserController {
  // Método para obter os dados do perfil do usuário
  static getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.jwtPayload.userId;
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      res.json({ nome: user.nome, email: user.email });
    } catch (error) {
      next(error);
    }
  };

  // Método para atualizar os dados do usuário
  static updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.jwtPayload.userId;
      const { nome, senha } = req.body;
      const userRepository = AppDataSource.getRepository(User);
      let user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      if (nome) {
        user.nome = nome;
      }

      if (senha) {
        user.senha = await bcrypt.hash(senha, 8);
      }

      await userRepository.save(user);
      res.json({ message: "Perfil atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  // Método para deletar a conta do usuário
  static deleteAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = res.locals.jwtPayload.userId;
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado" });
        return;
      }

      await userRepository.remove(user);
      res.json({ message: "Conta deletada com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
