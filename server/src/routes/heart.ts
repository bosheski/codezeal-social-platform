import express, { NextFunction, Request, Response } from "express";
import { authUser } from "../middleware";
import { SafeUser } from "../types";
import { heartPost, unheartPost } from "../services/heart.service";

const router = express.Router();

router.post('/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 console.log(req.body.postId);
 const { postId } = req.body;
 if (!postId) {
  return res.status(400).json({ error: 'Post id is required' });
 }
 try {
  const post = await heartPost(postId, req.user as SafeUser);
  res.json(post);
 } catch (error) {
  next(error);
 }
})
router.delete('/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 const { postId } = req.body;
 if (!postId) {
  return res.status(400).json({ error: 'Post id is required' });
 }
 try {
  const post = await unheartPost(postId, req.user as SafeUser);
  res.json(post);
 } catch (error) {
  next(error);
 }
})
export default router;