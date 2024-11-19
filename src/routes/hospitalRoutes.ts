import { Router } from "express";
import HospitalController from "../controllers/HospitalController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.get("/", [checkJwt], HospitalController.listAll);

export default router;
