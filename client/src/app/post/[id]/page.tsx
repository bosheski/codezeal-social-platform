'use client';

import React from "react"
import ReactMarkdown from "react-markdown"

const Post: React.FC = () => {
 const post = {
  id: "1",
  title: "Prisma is the perfect ORM for Next.js",
  content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
  published: false,
  author: {
   name: "Nikolas Burk",
   email: "burk@prisma.io",
  },
 }
 let title = post.title
 if (!post.published) {
  title = `${title} (Draft)`
 }

 return (
  <div>
   <h2>{title}</h2>
   <p>By {post?.author?.name || "Unknown author"}</p>
   <ReactMarkdown children={post.content} />
  </div>
 )
}

export default Post
