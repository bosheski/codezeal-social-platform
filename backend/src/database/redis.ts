import { createClient } from "redis";
import RedisStore from "connect-redis";
const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.connect();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "shub:",
});

redisClient.on("error", (err) => {
  console.error(err);
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("end", () => {
  console.log("Disconnected from Redis");
});

export { redisClient, redisStore };
