import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { votePost, removeVote } from "../controllers/voteController";

const router = Router();

// Auth required
router.post("/:postId", authMiddleware, votePost);
router.delete("/:postId", authMiddleware, removeVote);

export default router;