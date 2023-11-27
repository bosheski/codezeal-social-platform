import express, { Request, Response } from "express";
const router = express.Router();

import { authUser } from "../middleware";

router.get("/health", authUser, (req: Request, res: Response) => {
  const response = {
    status: "ok",
  };
  res.status(200).json(response);
});

export default router;
