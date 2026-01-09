import { Request, Response } from "express";
import { AppDataSource } from "../services/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Campos obrigatórios" });
    }

    const userRepo = AppDataSource.getRepository(User);

    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepo.create({
      name,
      email,
      password: hashedPassword,
      plan: "FREE",

    });

    await userRepo.save(user);

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Cadastro realizado com sucesso",
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("❌ Erro no signUp:", error);
    return res.status(500).json({ message: "Erro interno no cadastro" });
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    console.log("➡️ Sign-in chamado", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email e senha obrigatórios" });
    }

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Login realizado com sucesso",
      user: { id: user.id, name: user.name, email: user.email, plan: user.plan },
      token,
    });
  } catch (error) {
    console.error("❌ Erro no signIn:", error);
    return res.status(500).json({ message: "Erro interno no login" });
  }
};

const updatePlan = async (req: Request, res: Response) => {
  try {
    const { plan } = req.body;
    const userId = (req as any).userId;

    if (!plan) {
      return res.status(400).json({ message: "Plano não informado" });
    }

    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    user.plan = plan;
    await userRepo.save(user);

    return res.json({ message: "Plano atualizado com sucesso", user });
  } catch (error) {
    console.error("❌ Erro ao atualizar plano:", error);
    return res.status(500).json({ message: "Erro ao atualizar plano" });
  }
};

export const authController = {
  signUp,
  signIn,
  updatePlan,
};
