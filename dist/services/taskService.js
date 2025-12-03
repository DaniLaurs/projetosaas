"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskService = void 0;
// backend/src/services/taskService.ts
const data_source_1 = require("../services/data-source");
const Task_1 = require("../entities/Task");
const taskRepository = data_source_1.AppDataSource.getRepository(Task_1.Task);
exports.taskService = {
    async createTask(userId, data) {
        const task = taskRepository.create({
            ...data,
            user: { id: userId },
            done: false,
        });
        return await taskRepository.save(task);
    },
    async listTasks(userId) {
        return await taskRepository.find({
            where: { user: { id: userId } },
            order: { id: "DESC" }
        });
    },
    async listPending(userId) {
        return await taskRepository.find({
            where: { user: { id: userId }, done: false },
            order: { id: "DESC" }
        });
    },
    async listDone(userId) {
        return await taskRepository.find({
            where: { user: { id: userId }, done: true },
            order: { id: "DESC" }
        });
    },
    async toggleDone(taskId, userId) {
        const task = await taskRepository.findOne({
            where: { id: taskId, user: { id: userId } }
        });
        if (!task)
            throw new Error("Task not found");
        task.done = !task.done;
        return await taskRepository.save(task);
    },
    // ✅ AGORA EXISTE!
    async deleteTask(taskId, userId) {
        const task = await taskRepository.findOne({
            where: { id: taskId, user: { id: userId } }
        });
        if (!task)
            throw new Error("Task not found");
        return await taskRepository.remove(task);
    }
};
