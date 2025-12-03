import { Router } from "express";
import { authController } from "../controllers/authControllers";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);

export default router;
