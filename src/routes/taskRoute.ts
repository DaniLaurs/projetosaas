import { Router } from "express";
import { taskController } from "../controllers/taskControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, taskController.create);
router.get("/", authMiddleware, taskController.list);
router.get("/pending", authMiddleware, taskController.pending);
router.get("/done", authMiddleware, taskController.done);
router.patch("/:id/toggle", authMiddleware, taskController.toggleDone);
router.delete("/:id", authMiddleware, taskController.deleteTask);

export default router;
