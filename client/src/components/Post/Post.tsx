import React from 'react'
import { PostProps } from '../../types/Post'
import { CommentProp } from '../../types/Comment'
import PostComments from './PostComments'
import styles from './Post.module.scss'
import PostTime from './PostTime'

type Props = {
 key: string,
 post: PostProps,
 index: number
}

function Post({ post }: Props) {
 const { id, title, content, published, createdAt, hearts, comments, author, category, media } = post;

 let heartsCount = 0;
 if (Array.isArray(hearts)) {
  heartsCount = hearts.length;
 }
 return (
  <div className={styles.container}>
   <div className={styles.postAuthorContainer}>
    <img src={author ? author.image : 'https://api.realworld.io/images/smiley-cyrus.jpeg'} alt="author image" className={styles.authorImage} />
    <p className={styles.postAuthorName}>{author ? author.name : 'Unknown'}</p>
    <PostTime jsonCreatedAt={createdAt} />
   </div>
   <h1 className={styles.postTitle}>{title}</h1>
   <p className={styles.postContent}>{content}</p>
   <p>{category.name}</p>
   <p>{heartsCount} hearts</p>
   {comments.map((comment: CommentProp, index) => (
    <PostComments key={comment.id} comment={comment} index={index} />
   ))}
  </div >
 )
}

export default Post