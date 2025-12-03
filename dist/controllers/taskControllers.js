"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const taskService_1 = require("../services/taskService");
exports.taskController = {
    async create(req, res) {
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        const { title, description } = req.body;
        try {
            const task = await taskService_1.taskService.createTask(req.userId, { title, description });
            return res.json(task);
        }
        catch (error) {
            return res.status(400).json({ error: "Erro ao criar" });
        }
    },
    async list(req, res) {
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        try {
            const tasks = await taskService_1.taskService.listTasks(req.userId);
            return res.json(tasks);
        }
        catch {
            return res.status(400).json({ error: "Erro ao listar" });
        }
    },
    async pending(req, res) {
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        try {
            const tasks = await taskService_1.taskService.listPending(req.userId);
            return res.json(tasks);
        }
        catch {
            return res.status(400).json({ error: "Erro ao listar pendentes" });
        }
    },
    async done(req, res) {
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        try {
            const tasks = await taskService_1.taskService.listDone(req.userId);
            return res.json(tasks);
        }
        catch {
            return res.status(400).json({ error: "Erro ao listar concluídas" });
        }
    },
    async toggleDone(req, res) {
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        const { id } = req.params;
        try {
            const result = await taskService_1.taskService.toggleDone(Number(id), req.userId);
            return res.json(result);
        }
        catch {
            return res.status(400).json({ error: "Erro ao alterar status" });
        }
    },
    async deleteTask(req, res) {
        if (!req.userId) {
            return res.status(401).json({ message: "Usuário não autenticado" });
        }
        const { id } = req.params;
        try {
            await taskService_1.taskService.deleteTask(Number(id), req.userId);
            return res.json({ message: "Tarefa removida" });
        }
        catch {
            return res.status(400).json({ error: "Erro ao remover tarefa" });
        }
    }
};
