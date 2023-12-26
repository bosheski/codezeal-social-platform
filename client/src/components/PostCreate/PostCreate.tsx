import React from 'react'
import styles from './PostCreate.module.scss'
import Link from 'next/link'

type Props = {}

function PostCreate({ }: Props) {
 return (
  <div className={styles.container}>
   <Link href="/feed/posts/create">
    <p className={styles.createPost}>Create Post</p>
   </Link>
  </div>
 )
}

export default PostCreate