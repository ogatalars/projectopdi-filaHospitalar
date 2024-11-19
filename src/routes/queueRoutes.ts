import { Router } from "express";
import QueueController from "../controllers/QueueController";

const router = Router();

router.get("/:hospitalId", QueueController.getByHospitalId);

export default router;
