import { Router } from "express";
import authRoutes from "./authRoutes";
import hospitalRoutes from "./hospitalRoutes";
import queueRoutes from "./queueRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/hospitais", hospitalRoutes);
router.use("/filas", queueRoutes);

export default router;
