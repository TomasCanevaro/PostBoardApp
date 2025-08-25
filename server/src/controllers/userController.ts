import { Request, Response } from "express";
import prisma from "../prisma";

export const getUserProfile = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        posts: {
          select: {
            id: true,
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            votes: {
              select: {
                value: true,
              },
            },
          },
        },
        votes: {
          select: {
            postId: true,
            value: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // add computed score for each post
    const postsWithScore = user.posts.map((post) => ({
      ...post,
      score: post.votes.reduce((sum, v) => sum + v.value, 0),
    }));

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      posts: postsWithScore,
      votes: user.votes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};
