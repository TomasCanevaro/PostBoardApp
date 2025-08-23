import { Request, Response } from "express";
import prisma from "../prisma";

export const getAllPosts = async (req: Request, res: Response) => {
  const userId = (req as any).userId || null;

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: { select: { id: true, username: true } },
        votes: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const postsWithScore = posts.map((post) => {
      const score = post.votes.reduce((sum, v) => sum + v.value, 0);

      let currentUserVote: number | null = null;
      if (userId) {
        const vote = post.votes.find((v) => v.userId === userId);
        if (vote) currentUserVote = vote.value;
      }

      return {
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author,
        score,
        currentUserVote,
      };
    });

    res.json(postsWithScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const userId = (req as any).userId || null;

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: { select: { id: true, username: true } },
        votes: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const score = post.votes.reduce((sum, v) => sum + v.value, 0);

    let currentUserVote: number | null = null;
    if (userId) {
      const vote = post.votes.find((v) => v.userId === userId);
      if (vote) currentUserVote = vote.value;
    }

    res.json({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      score,
      currentUserVote,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = (req as any).userId;

  try {
    const newPost = await prisma.post.create({
      data: { title, content, authorId: userId },
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: "Error creating post" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const userId = (req as any).userId;
  const postId = Number(req.params.id);

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.authorId !== userId) return res.status(403).json({ message: "Not authorized" });

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { title, content },
    });
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const postId = Number(req.params.id);

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.authorId !== userId) return res.status(403).json({ message: "Not authorized" });

    await prisma.post.delete({ where: { id: postId } });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting post" });
  }
};