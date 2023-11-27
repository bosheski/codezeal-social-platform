"use server";

import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";
import * as cookieParser from "cookie-parser";
const redis = new Redis({
 url: String(process.env.UPSTASH_URL),
 token: String(process.env.UPSTASH_TOKEN),
})
export const loginUser = async (data: any) => {
 const response = await fetch('http://localhost:3005/auth/login', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  next: {
   revalidate: 0,
  }
 });

 if (!response.ok) {
  throw new Error('Login failed');
 }

 const responseData = await response.json();
 console.log("responseData", responseData);
 const getCookieValue = (cookieStr: string, key: string) => {
  if (!cookieStr) return null;
  for (const cookie of cookieStr.split(";")) {
   const name = cookie.split("=")[0].trim();
   if (name !== key) continue;
   const value = cookie.replace(`${name}=`, "").trim();
   return value;
  }
  return null;
 }
 const setCookieStr: any = response.headers.get("set-cookie");
 console.log('setCookieStr test', setCookieStr);
 const session: any = getCookieValue(setCookieStr, "_session");
 console.log('session  action', session);
 cookies().set({
  name: "_session",
  value: session,
  httpOnly: false,
  secure: false,
  maxAge: 1000 * 60 * 60 * 24 * 1,
  sameSite: "lax",
 })
 return responseData;
}


export const getUser = async () => {
 const userCookie = cookies().get("_session");
 const rawSession: any = userCookie?.value;
 const decodeRawSession = decodeURIComponent(rawSession);
 console.log('rawSession', rawSession);
 if (!rawSession) return false;
 const sessionId = cookieParser.signedCookie(decodeRawSession, String(process.env.REDIS_SECRET) || "secret");
 const session = await redis.get(`shub:${sessionId}`);
 if (!session) return false;
 const user = (session as any).passport.user;
 console.log('user', user);
 return user;
}