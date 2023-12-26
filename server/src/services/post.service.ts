import { findUserIdByEmail } from "./auth.service";
import prisma from "../lib/prisma";
import { buildCategoryQuery, buildOrderByQuery } from "../queries/queries";




export const getAllPosts = async (query: any) => {
 let posts: any = [];
 const orderByQuery = buildOrderByQuery(query);
 posts = await prisma.post.findMany({
  orderBy: orderByQuery,
  take: Number(query.limit) || 15,
  skip: Number(query.offset) || 0,
  include: {
   category: {
    select: {
     name: true,
     followers: true,
    },
   },
   comments: {
    select: {
     body: true,
     author: {
      select: {
       name: true,
       image: true,
      },
     },
    }
   },
   hearts: true,
   author: {
    select: {
     name: true,
     image: true,
    },
   },
  }
 })
 return posts;
}
export const getAllPostsByUser = async (query: any, email: string) => {
 let posts: any = [];
 const user = await prisma.user.findUnique({
  where: {
   email,
  },
  select: {
   followedCategories: {
    select: {
     name: true,
    },
   },
  },
 })
 const followedCategories = user?.followedCategories.map((category) => category.name);
 console.log('followedCategories', followedCategories);
 const orderByQuery = buildOrderByQuery(query);
 const categoryQuery = buildCategoryQuery(query, followedCategories);
 console.log('yes', query)
 posts = await prisma.post.findMany({
  where: {
   AND: categoryQuery,
  },
  orderBy: orderByQuery || {
   hearts: {
    _count: 'desc',
   },
  },
  take: Number(query.limit) || 15,
  skip: Number(query.offset) || 0,
  include: {
   category: {
    select: {
     name: true,
     followers: true,
    },
   },
   comments: {
    select: {
     id: true,
     body: true,
     author: {
      select: {
       name: true,
       image: true,
      },
     },
    }
   },
   author: {
    select: {
     name: true,
     image: true,
    },
   },

  }
 })
 return posts;
}
export const getPostsByCategory = async (category: string, query: any) => {
 // if there is no query, return popular posts for the category, else return posts based on the query
 if (Object.keys(query).length === 0) {
  const posts = await prisma.post.findMany({
   where: {
    category: {
     name: {
      equals: category,
     },
    },
   },
   orderBy: {
    hearts: {
     _count: 'desc',
    },
   },
   take: 15,
   skip: 0,
   include: {
    category: {
     select: {
      name: true,
      followers: true,
     },
    },
    author: {
     select: {
      name: true,
      image: true,
     },
    },
   }
  });
  return posts;
 } else if ('new' in query) {
  const posts = await prisma.post.findMany({
   where: {
    category: {
     name: {
      equals: category,
     },
    },
   },
   orderBy: {
    createdAt: 'desc',
   },
   take: 15,
   skip: 0,
   include: {
    category: {
     select: {
      name: true,
      followers: true,
     },
    },
    author: {
     select: {
      name: true,
      image: true,
     },
    },
   }
  });
  return posts;
 }
};
export const createPost = async (title: string, content: string, category: string, email: string, media?: string) => {
 const user = await findUserIdByEmail(email);

 const existingCategory = await prisma.category.findUnique({
  where: { name: category },
  select: { id: true },
 });
 if (!existingCategory) {
  throw new Error(`Category ${category} does not exist`);
 }

 const { ...createdPost } = await prisma.post.create({
  data: {
   title,
   content,
   media,
   category: { connect: { id: existingCategory.id } },
   author: {
    connect: {
     id: user?.id,
    },
   },
  },
  include: {
   category: {
    select: {
     name: true,
     followers: true,
    },
   },
   author: {
    select: {
     name: true,
     image: true,
    },
   },
   hearts: true,
   _count: {
    select: {
     hearts: true,
    },
   },
  },
 });

 return {
  ...createdPost,
  heartsCount: createdPost._count?.hearts,
 }
}
export const editPost = async (post: any, email: string) => {
 const user = await findUserIdByEmail(email);
 const { id, title, content } = post;
 if (!id) {
  throw new Error('Post id is required');
 }
 const existingPost = await prisma.post.findUnique({
  where: {
   id: post.id,
  },
  select: {
   authorId: true,
  },
 })
 if (existingPost?.authorId !== user?.id) {
  throw new Error('Failed');
 }

 const updatedPost = await prisma.post.update({
  where: {
   id,
  },
  data: {
   ...(title && { title }),
   ...(content && { content }),
  },
  include: {
   author: {
    select: {
     name: true,
     image: true,
    },
   },
   _count: {
    select: {
     hearts: true,
    },
   },
  }
 })
 return {
  ...updatedPost,
  heartsCount: updatedPost._count?.hearts,
 }
}
export const deletePost = async (id: string, email: string) => {
 const user = await findUserIdByEmail(email);
 console.log('user', user)
 // if the user id does not match the author id, return false
 const post = await prisma.post.findUnique({
  where: {
   id,
  },
  select: {
   authorId: true,
  },
 })
 if (post?.authorId !== user?.id) {
  return false;
 }
 await prisma.post.delete({
  where: {
   id,
  },
 })
 return true;
}