import { Request, Response } from "express";
import prisma from "../prisma";

export const votePost = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const postId = Number(req.params.postId);
  const { value } = req.body; // expected { value: 1 } or { value: -1 }

  if (value !== 1 && value !== -1) {
    return res.status(400).json({ message: "Vote value must be 1 or -1" });
  }

  try {
    // check if post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: "Post not found" });

    // check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: { userId_postId: { userId, postId } },
    });

    let vote;
    if (existingVote) {
      // if same vote, remove it (toggle off)
      if (existingVote.value === value) {
        await prisma.vote.delete({ where: { id: existingVote.id } });
        return res.json({ message: "Vote removed" });
      }
      // otherwise update vote
      vote = await prisma.vote.update({
        where: { id: existingVote.id },
        data: { value },
      });
    } else {
      // create new vote
      vote = await prisma.vote.create({
        data: { value, userId, postId },
      });
    }

    res.json(vote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error voting" });
  }
};