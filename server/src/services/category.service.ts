import { findUserIdByEmail } from "./auth.service";
import slugify from "slugify";
import prisma from "../lib/prisma";

export const createCategory = async (name: string, user: any) => {
 const userRole = await prisma.user.findUnique({
  where: {
   email: user.email,
  },
  select: {
   role: true,
  },
 });
 if (userRole?.role !== 'ADMIN') {
  throw new Error('Unauthorized');
 }
 const category = await prisma.category.create({
  data: {
   name: name,
  },
 });

 return category;
}
export const getCategories = async (query: any) => {
 const { limit, offset } = query;
 const categories = await prisma.category.findMany({
  take: Number(limit) || 15,
  skip: Number(offset) || 0,
  select: {
   name: true,
   followers: {
    select: {
     id: true,
     name: true,
     email: true,
    },
   }
  },
  // order by followers count
  orderBy: {
   followers: {
    _count: 'desc',
   },
  },
 });

 return categories;

}

export const findMatchedCategory = async (search: string, email: string) => {
 const user = await findUserIdByEmail(email);

 const categories = await prisma.category.findMany({
  where: {
   name: {
    contains: search,
    mode: 'insensitive',
   },
  },
  // count followers
  include: {
   followers: {
    where: {
     id: user.id
    },
   }
  },
  orderBy: {
   followers: {
    _count: 'desc',
   },
  },
 });
 console.log('result', categories);
 return categories;
}

export const getFollowedCategories = async (query: any, email: string) => {
 const { limit, offset } = query;
 const user = await findUserIdByEmail(email);
 const categories = await prisma.category.findMany({
  take: Number(limit) || 8,
  skip: Number(offset) || 0,
  select: {
   name: true,
  },
  where: {
   followers: {
    some: {
     id: user.id,
    },
   },
  },
  orderBy: {
   followers: {
    _count: 'desc',
   },
  },
 });
 return categories;
}
export const followCategory = async (categoryName: string, email: string) => {
 const user = await findUserIdByEmail(email);

 const category = await prisma.category.update({
  where: { name: categoryName },
  data: {
   followers: {
    connect: {
     id: user.id,
    },
   },
  },
 });

 return category;
}

export const unFollowCategory = async (categoryName: string, email: string) => {
 const user = await findUserIdByEmail(email);

 const category = await prisma.category.update({
  where: { name: categoryName },
  data: {
   followers: {
    disconnect: {
     id: user.id,
    },
   },
  },
 });

 return category;
}