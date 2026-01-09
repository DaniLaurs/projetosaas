import { Router } from "express";
import { authController } from "../controllers/authControllers";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post(
  "/plan",
  authMiddleware,
  authController.updatePlan
);

export default router;
