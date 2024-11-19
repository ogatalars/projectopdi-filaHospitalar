import { Router } from "express";
import authRoutes from "./authRoutes";
import hospitalRoutes from "./hospitalRoutes";
import queueRoutes from "./queueRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/hospitais", hospitalRoutes);
router.use("/filas", queueRoutes);
router.use("/user", userRoutes);

export default router;
