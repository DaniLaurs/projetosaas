// backend/src/services/taskService.ts
import { AppDataSource } from "../services/data-source";
import { Task } from "../entities/Task";

const taskRepository = AppDataSource.getRepository(Task);

export const taskService = {
  async createTask(userId: number, data: { title: string; description?: string }) {
    const task = taskRepository.create({
      ...data,
      user: { id: userId },
      done: false,
    });
    return await taskRepository.save(task);
  },

  async listTasks(userId: number) {
    return await taskRepository.find({
      where: { user: { id: userId } },
      order: { id: "DESC" }
    });
  },

  async listPending(userId: number) {
    return await taskRepository.find({
      where: { user: { id: userId }, done: false },
      order: { id: "DESC" }
    });
  },

  async listDone(userId: number) {
    return await taskRepository.find({
      where: { user: { id: userId }, done: true },
      order: { id: "DESC" }
    });
  },

  async toggleDone(taskId: number, userId: number) {
    const task = await taskRepository.findOne({
      where: { id: taskId, user: { id: userId } }
    });

    if (!task) throw new Error("Task not found");

    task.done = !task.done;

    return await taskRepository.save(task);
  },

  // ✅ AGORA EXISTE!
  async deleteTask(taskId: number, userId: number) {
    const task = await taskRepository.findOne({
      where: { id: taskId, user: { id: userId } }
    });

    if (!task) throw new Error("Task not found");

    return await taskRepository.remove(task);
  }
};
