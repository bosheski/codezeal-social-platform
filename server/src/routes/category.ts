import express, { NextFunction, Request, Response } from "express";
import { authUser } from "../middleware";
import { SafeUser } from "../types";
import { createCategory, followCategory, unFollowCategory, findMatchedCategory, getFollowedCategories } from "../services/category.service";


const router = express.Router();

router.post('/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 if (!req.body.name) {
  return res.status(400).json({ error: 'Name is required' });
 }
 try {
  const category = await createCategory(req.body.name, req.user as SafeUser);
  res.json(category);
 } catch (error) {
  next(error);
 }
});
router.get('/search/:search/', authUser, async (req: Request, res: Response, next: NextFunction) => {
 console.log('user', req.user)
 const userData = req.user as SafeUser;
 const email = userData.email
 try {
  const categories = await findMatchedCategory(req.params.search, email)
  res.json(categories);
 } catch (error) {
  next(error);
 }
})

router.get('/followed', authUser, async (req: Request, res: Response, next: NextFunction) => {
 if (req.user === undefined) {
  return res.status(401).json({ error: 'Unauthorized' });
 }
 const userData = req.user as SafeUser;
 const email = userData.email;
 try {
  const categories = await getFollowedCategories(req.query, email);
  res.json(categories);
 } catch (error) {
  next(error);
 }
});

router.post('/follow', authUser, async (req: Request, res: Response, next: NextFunction) => {
 if (!req.body.categoryName) {
  return res.status(400).json({ error: 'Category name is required' });
 }
 if (req.user === undefined) {
  return res.status(401).json({ error: 'Unauthorized' });
 }
 const userData = req.user as SafeUser;
 const email = userData.email;
 try {
  const category = await followCategory(req.body.categoryName, email);
  res.json(category);
 } catch (error) {
  next(error);
 }
});

router.post('/unfollow', authUser, async (req: Request, res: Response, next: NextFunction) => {
 if (!req.body.categoryName) {
  return res.status(400).json({ error: 'Category name is required' });
 }
 if (req.user === undefined) {
  return res.status(401).json({ error: 'Unauthorized' });
 }
 const userData = req.user as SafeUser;
 const email = userData.email;
 try {
  const category = await unFollowCategory(req.body.categoryName, email);
  res.json(category);
 } catch (error) {
  next(error);
 }
});

export default router;
