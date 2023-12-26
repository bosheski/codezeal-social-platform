"use server";

import { cookies } from "next/headers";
import { Redis } from "@upstash/redis";
import * as cookieParser from "cookie-parser";
import { redirect } from 'next/navigation';
import { revalidateTag } from "next/cache";
import { routeName, searchAllParams } from "../components/FeedList/FeedList";

const redis = new Redis({
 url: String(process.env.UPSTASH_URL),
 token: String(process.env.UPSTASH_TOKEN),
})
export const loginUser = async (data: any) => {
 await loginUserSubmit(data);
 revalidateTag('user_login');
 redirect('/');
}
const loginUserSubmit = async (data: any) => {
 const response = await fetch('http://localhost:3005/auth/login', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  next: {
   tags: ['user_login'],
  },
 });

 if (!response.ok) {
  throw new Error('Login failed');
 }

 const responseData = await response.json();

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
 const session: any = getCookieValue(setCookieStr, "_session");
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
 if (!rawSession) return [];
 const sessionId = cookieParser.signedCookie(decodeRawSession, String(process.env.REDIS_SECRET) || "secret");
 const session = await redis.get(`shub:${sessionId}`);
 if (!session) return [];
 const user = (session as any).passport.user;
 console.log('user from action', user)
 return user;
}

export const logoutUser = async () => {
 const userCookie = cookies().get("_session");
 console.log('userCookie', userCookie);
 const rawSession: any = userCookie?.value;
 const headers = {
  'Content-Type': 'application/json',
  'Cookie': `_session=${rawSession}`
 }
 const response = await fetch('http://localhost:3005/auth/logout', {
  method: 'GET', headers,
  next: {
   tags: ['user_logout'],
  },
 });
 if (!response.ok) {
  return [];
 }
 cookies().delete("_session");
 revalidateTag('user_logout');
}


export const fetchData = async (routeName: routeName, searchParams: searchAllParams) => {
 const userCookie = cookies().get("_session");
 const rawSession: any = userCookie?.value;
 const params = new URLSearchParams(searchParams);
 const headers = {
  'Content-Type': 'application/json',
 }
 try {
  if (rawSession) {
   headers['Cookie'] = `_session=${rawSession}`
  }

  const response = await fetch(`http://localhost:3005/${routeName}?limit=6&${params}`, {
   method: 'GET', headers,
   next: {
    tags: ['posts'],
   },
  });
  if (!response.ok || response.status === 401) {
   return [];
  }
  const responseData = await response.json();
  revalidateTag('posts');
  return responseData;
 } catch (error) {
  throw new Error('Server might be temporarily down. Please try again later.');
 }
}

export const fetchFollowedCategories = async (params: any) => {
 const userCookie = cookies().get("_session");
 const rawSession: any = userCookie?.value;
 const headers = {
  'Content-Type': 'application/json',
 }
 try {
  if (rawSession) {
   headers['Cookie'] = `_session=${rawSession}`
  }
  const response = await fetch('http://localhost:3005/categories/followed', {
   method: 'GET', headers,
   next: {
    tags: ['categories'],
   },
  });
  if (!response.ok) {
   return [];
  }
  const responseData = await response.json();
  revalidateTag('categories');
  return responseData;
 } catch (error) {
  throw new Error('Server might be temporarily down. Please try again later.');
 }
}


