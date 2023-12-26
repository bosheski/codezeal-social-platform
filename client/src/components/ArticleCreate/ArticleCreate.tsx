import React from 'react'
import styles from './ArticleCreate.module.scss'
import Link from 'next/link'

type Props = {}

function ArticleCreate({ }: Props) {
 return (
  <div className={styles.container}>
   <Link href="/articles/create">
    <p className={styles.createPost}>Create Article</p>
   </Link>
  </div>
 )
}

export default ArticleCreate