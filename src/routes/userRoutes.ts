import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middleware/checkJwt";

const router = Router();

router.get("/profile", [checkJwt], UserController.getProfile);
router.put("/profile", [checkJwt], UserController.updateProfile);
router.delete("/profile", [checkJwt], UserController.deleteAccount);

export default router;
