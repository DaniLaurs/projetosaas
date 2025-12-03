import { Router } from "express";
import { updatePlan } from "../controllers/authControllers";

const router = Router();
router.post("/update", updatePlan);
export default router;
