import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postController";

const router = Router();

// Public
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Auth required
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

export default router;