import { Request, Response } from "express";
import { AppDataSource } from "../services/data-source";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const userRepo = AppDataSource.getRepository(User);

const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Campos obrigatórios" });

  const existing = await userRepo.findOne({ where: { email } });
  if (existing)
    return res.status(400).json({ message: "Usuário já existe" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepo.create({ name, email, password: hashedPassword });
  await userRepo.save(user);

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({
    message: "Cadastro realizado com sucesso",
    user: { id: user.id, name, email },
    token,
  });
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepo.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: "Credenciais inválidas" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: "Credenciais inválidas" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  res.json({
    message: "Login realizado com sucesso",
    user: { id: user.id, name: user.name, email },
    token,
  });
};

export const updatePlan = async (req: Request, res: Response) => {
  const { plan } = req.body;
  const userId = (req as any).userId;


  if (!plan)
    return res.status(400).json({ message: "Plano não informado" });

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

  user.plan = plan;
  await userRepo.save(user);

  res.json({ message: "Plano atualizado com sucesso", user });
};

export const authController = {
  signUp,
  signIn,
  updatePlan,
};
