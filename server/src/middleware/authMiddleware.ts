import { Request, Response, NextFunction } from "express";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  return res.status(401).json({ success: false, message: "Unauthorized" });
};
