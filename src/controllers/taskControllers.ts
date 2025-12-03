// backend/src/controllers/taskController.ts
import { Request, Response } from "express";
import { taskService } from "../services/taskService";

export const taskController = {
  async create(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const { title, description } = req.body;

    try {
      const task = await taskService.createTask(req.userId, { title, description });
      return res.json(task);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar" });
    }
  },

  async list(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    try {
      const tasks = await taskService.listTasks(req.userId);
      return res.json(tasks);
    } catch {
      return res.status(400).json({ error: "Erro ao listar" });
    }
  },

  async pending(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    try {
      const tasks = await taskService.listPending(req.userId);
      return res.json(tasks);
    } catch {
      return res.status(400).json({ error: "Erro ao listar pendentes" });
    }
  },

  async done(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    try {
      const tasks = await taskService.listDone(req.userId);
      return res.json(tasks);
    } catch {
      return res.status(400).json({ error: "Erro ao listar concluídas" });
    }
  },

  async toggleDone(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const { id } = req.params;

    try {
      const result = await taskService.toggleDone(Number(id), req.userId);
      return res.json(result);
    } catch {
      return res.status(400).json({ error: "Erro ao alterar status" });
    }
  },

  async deleteTask(req: Request, res: Response) {
    if (!req.userId) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    const { id } = req.params;

    try {
      await taskService.deleteTask(Number(id), req.userId);
      return res.json({ message: "Tarefa removida" });
    } catch {
      return res.status(400).json({ error: "Erro ao remover tarefa" });
    }
  }
};
