import prisma from "../lib/prisma";
import { findUserIdByEmail } from "./auth.service";

export const heartPost = async (id: string, user: any) => {
 const userId = await findUserIdByEmail(user.email);
 console.log('userId', userId)
 const post = await prisma.post.update({
  where: {
   id,
  },
  data: {
   hearts: {
    connect: {
     id: userId.id
    }
   }
  }
 })
 if (!post) throw new Error('Post not found');
 return post;
}

export const unheartPost = async (id: string, user: any) => {
 const userId = await findUserIdByEmail(user.email);
 const post = await prisma.post.update({
  where: {
   id,
  },
  data: {
   hearts: {
    disconnect: {
     id: userId.id
    }
   }
  }
 })
 if (!post) throw new Error('Post not found');
 return post;
}