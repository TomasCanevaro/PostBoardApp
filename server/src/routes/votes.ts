import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { votePost } from "../controllers/voteController";

const router = Router();

// Auth required
router.post("/:postId", authMiddleware, votePost);

export default router;