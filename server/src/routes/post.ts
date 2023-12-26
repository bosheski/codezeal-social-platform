import express, { NextFunction, Request, Response } from "express";
import { authUser } from "../middleware";
import { SafeUser } from "../types";
import { createPost, getAllPosts, getAllPostsByUser, getPostsByCategory, editPost, deletePost } from "../services/post.service";
const router = express.Router();


router.get('/', async (req: Request, res: Response, next: NextFunction) => {
 console.log('req.query', req.query);
 try {
  let posts = [];
  if (!req.user) {
   posts = await getAllPosts(req.query);
  } else {
   const userData = req.user as SafeUser;
   const email = userData.email;
   posts = await getAllPostsByUser(req.query, email);
  }
  res.json(posts);
 } catch (error) {
  next(error);
 }
});

router.put('/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 const userData = req.user as SafeUser;
 const email = userData.email;
 try {
  const posts = await editPost(req.body, email);
  res.json(posts);
 } catch (error) {
  next(error);
 }
})

router.delete('/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 const userData = req.user as SafeUser;
 const email = userData.email;
 try {
  const response = await deletePost(req.body.id, email);
  if (response === true) {
   res.json({ message: 'Post deleted successfully' });
  } else {
   res.json({ message: 'Unable to delete post' });
  }
 } catch (error) {
  next(error);
 }
})

router.get('/:category', async (req: Request, res: Response, next: NextFunction) => {
 if (!req.params.category) {
  return res.status(400).json({ error: 'Category is required' });
 }
 const { category } = req.params;
 const query = req.query;
 try {
  const posts = await getPostsByCategory(category as string, query);
  res.json(posts);
 } catch (error) {
  next(error);
 }

})

router.post('/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 const { title, content, category, image } = req.body;
 const userData = req.user as SafeUser;
 const email = userData.email;
 try {
  console.log('title', title, 'content', content, 'category', category, 'image', image);
  const post = await createPost(title, content, category, email, image || undefined);
  res.json(post);
 } catch (error) {
  next(error);
 }
})


export default router;