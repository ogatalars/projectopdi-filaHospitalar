// src/controllers/AuthController.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import { User } from "../models/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";

class AuthController {
  static register: RequestHandler = async (req, res, next) => {
    try {
      const { nome, email, senha } = req.body;

      if (!(nome && email && senha)) {
        res.status(400).json({ message: "Todos os campos são obrigatórios" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const userExists = await userRepository.findOne({ where: { email } });

      if (userExists) {
        res.status(409).json({ message: "Email já cadastrado" });
        return;
      }

      const hashedPassword = await bcrypt.hash(senha, 8);

      const user = userRepository.create({
        nome,
        email,
        senha: hashedPassword,
      });

      await userRepository.save(user);

      res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static login: RequestHandler = async (req, res, next) => {
    try {
      const { email, senha } = req.body;

      if (!(email && senha)) {
        res.status(400).json({ message: "Email e senha são obrigatórios" });
        return;
      }

      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        res.status(401).json({ message: "Credenciais inválidas" });
        return;
      }

      const validPassword = await bcrypt.compare(senha, user.senha);

      if (validPassword) {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET || "jwt_secret",
          { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login realizado com sucesso", token });
        return;
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || "jwt_secret",
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Login realizado com sucesso", token });
      return;
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
