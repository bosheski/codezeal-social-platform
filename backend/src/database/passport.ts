import passport from "passport";
import passportLocal from "passport-local";
import passportGoogle from "passport-google-oauth20";
import { SafeUser, User } from "../types";
import AppleStrategy from "passport-apple";
import bcrypt from "bcrypt";
import crypto from "crypto";
import prisma from "../lib/prisma";


const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser<any, any>((user: User, done: any) => {
  const safeUser: SafeUser = {
    _id: user._id,
    email: user.email,
    name: user.name,
    googleId: user.googleId,
    appleId: user.appleId,
  };

  done(null, safeUser);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser<any, any>((user: User, done: any) => {
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async function (
      email: string,
      password: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      done: (error: any, user?: any, options?: any) => void
    ) {
      console.log('this got triggered', email, password)
      const user = await prisma.user.findUnique({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: "Invalid username or password." });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return done(null, false, { message: "Invalid username or password." });
      }
      done(null, user, { message: "Logged in successfully" });
    }
  )
);

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: String(process.env.GOOGLE_CLIENT_ID),
//       clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
//       callbackURL: String(process.env.GOOGLE_CALLBACK_URL),
//     },
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     async function (
//       accessToken: string,
//       refreshToken: string,
//       profile: any,
//       done: (error: any, user?: any, options?: any) => void
//     ) {
//       const jsonProfile = profile["_json"];
//       const user = await UserModel.findOne({ googleId: jsonProfile.sub });
//       if (!user) {
//         const newUser = new UserModel({
//           googleId: jsonProfile.sub,
//           email: jsonProfile.email,
//           name: jsonProfile.name,
//           password: crypto.randomBytes(64).toString("hex"),
//         });

//         await newUser.save();
//         return done(null, newUser);
//       }
//       return done(null, user);
//     }
//   )
// );

// passport.use(
//   new AppleStrategy(
//     {
//       clientID: process.env.APPLE_CLIENT_ID as string,
//       teamID: process.env.APPLE_TEAM_ID as string,
//       callbackURL: process.env.APPLE_CALLBACK_URL,
//       keyID: process.env.APPLE_KEY_ID as string,
//       privateKeyLocation: process.env.APPLE_KEY_LOCATION as string,
//       passReqToCallback: true,
//     },
//     async function (req, accessToken, refreshToken, idToken, profile, done) {
//       const encodedData = idToken.split(".")[1];
//       const decodedData = Buffer.from(encodedData, "base64").toString("utf-8");
//       const data = JSON.parse(decodedData);

//       const { sub, email } = data;

//       const user = await UserModel.findOne({ appleId: sub });
//       if (!user) {
//         const name = req.body.user
//           ? `${JSON.parse(req.body.user).name.firstName} ${
//               JSON.parse(req.body.user).name.lastName
//             }`
//           : crypto.randomBytes(10).toString("hex");

//         const newUser = new UserModel({
//           appleId: sub,
//           email: email,
//           name: name,
//           password: crypto.randomBytes(64).toString("hex"),
//         });
//         newUser.save();
//         return done(null, newUser);
//       }

//       return done(null, user);
//     }
//   )
// );

export default passport;
