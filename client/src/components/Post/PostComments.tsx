import React from 'react'
import { CommentProp } from '../../types/Comment';

type Props = {
 key: string,
 comment: CommentProp,
 index: number
}

function PostComments({ comment, index }: Props) {
 const { id, author, body, media } = comment;
 return (
  <div key={index}>
   <p>{author.name}</p>
   <p>{body}</p>
   {media && <img src={media} alt="comment media" />}
  </div>
 )
}

export default PostComments