import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // ✅ correção importante (resolve TODOS os erros de userId)
    (req as any).userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};
