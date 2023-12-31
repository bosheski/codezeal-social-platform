import "dotenv/config";
import "./helpers/logger";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import limiter from "./helpers/limiter";
import session from "express-session";
import passport from "./database/passport";
import indexRoutes from "./routes/index";
import authRoutes from "./routes/auth";
import postRoutes from "./routes/post";
import categoryRoutes from "./routes/category";
import heartRoutes from "./routes/heart";
import { redisStore } from "./database/redis";
console.log("secret", process.env.REDIS_SECRET);
const app = express();

app.use(helmet());
app.use(limiter);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const { headers: { cookie } } = req;
  if (cookie) {
    const allCookies = cookie.split(';').map(c => {
      if (!c.startsWith('_session')) return c;
      return `_session=${decodeURIComponent(c.split('=')[1])}`
    });
    req.headers.cookie = allCookies.join('; ');
    next();
  }
  else {
    next();
  }
})
app.use(
  session({
    store: redisStore,
    secret: process.env.REDIS_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    proxy: process.env.NODE_ENV === "development" ? false : true,
    name: "_session",
    cookie: {
      sameSite: process.env.NODE_ENV === "development" ? "none" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      path: "/",
      domain: process.env.NODE_ENV === "development" ? "localhost:3000" : ".sponsorhub.ai",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use('/posts', postRoutes);
app.use('/categories', categoryRoutes)
app.use('/heart', heartRoutes);

// const server = https.createServer(
//   {
//     cert: fs.readFileSync("/Users/bo/api.sponsorhub.ai+1.pem"),
//     key: fs.readFileSync("/Users/bo/api.sponsorhub.ai+1-key.pem"),
//   },
//   app
// );

app.listen(process.env.PORT || 3005, () => {
  console.log(`Server started on port ${process.env.PORT || 3005}`);
});
