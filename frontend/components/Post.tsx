'use client';

import React from "react";
import { useRouter } from 'next/navigation'
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const router = useRouter()
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => router.push(`/post/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content} />
    </div>
  );
};

export default Post;
