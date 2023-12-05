import express, { Request, Response } from "express";
import passport from "../database/passport";
import bcrypt from "bcrypt";
import { authUser } from "../middleware";
import { redisClient } from "../database/redis";
import { SafeUser } from "../types";
import prisma from "../lib/prisma";
const router = express.Router();

router.get("/me", authUser, (req: Request, res: Response) => {
  const user = req.user as any;
  const safeUser: SafeUser = {
    _id: user._id,
    email: user.email,
    name: user.name,
    googleId: user.googleId,
    appleId: user.appleId,
  };

  res.send({ success: true, data: safeUser });
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hash
      }
    });

    return res.json({
      success: true,
      data: {
        ...newUser,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }) as express.RequestHandler,
  async (req: Request, res: Response) => {
    console.log("thjis got tirggered", req.user)
    if (!req.user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const user = req.user as any;
    console.log('user', user)
    const safeUser: SafeUser = {
      _id: user.id,
      email: user.email,
      name: user.name,
      // googleId: user.googleId,
      // appleId: user.appleId,
    };

    return res.json({ success: true, data: safeUser });
  }
);

router.get("/logout", (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
    }
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }

      res.clearCookie("_session");
      return res.json({ success: true });
    });
  });
});

// Google routes
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   }) as express.RequestHandler
// );

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "https://app.sponsorhub.ai/login?error=google",
//   }) as express.RequestHandler,
//   (req: Request, res: Response) => {
//     try {
//       req.session.save((err) => {
//         if (err) {
//           console.log(err);
//         }
//         res.redirect("https://app.sponsorhub.ai");
//       });
//     } catch (error) {
//       console.log("error", error);
//     }
//   }
// );

// router.get("/apple", passport.authenticate("apple") as express.RequestHandler);

// router.post(
//   "/apple/callback",
//   passport.authenticate("apple", {
//     failureRedirect: "https://app.sponsorhub.ai/login?error=apple",
//   }) as express.RequestHandler,
//   (req: Request, res: Response) => {
//     req.session.save((err) => {
//       if (err) {
//         console.error(err);
//       }
//       res.redirect("https://app.sponsorhub.ai");
//     });
//   }
// );

export default router;
