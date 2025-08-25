import { Router } from "express";
import { getUserProfile } from "../controllers/userController";

const router = Router();

// public profile route
router.get("/:id", getUserProfile);

export default router;