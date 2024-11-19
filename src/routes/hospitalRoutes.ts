import { Router } from "express";
import HospitalController from "../controllers/HospitalController";

const router = Router();

router.get("/", HospitalController.listAll);
router.get("/:id", HospitalController.getOneById);

export default router;
