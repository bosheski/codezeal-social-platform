import React from 'react'
import Image from 'next/image'
import styles from "./FeedSidebar.module.scss"
import { useStore } from '../../store/useStore';

type Props = {}

function FeedAvatar({ }: Props) {
 const { isPostActive, isArticleActive, setPostActive, setArticleActive } = useStore();
 return (
  <div className={styles.avatarContainer}>
   <div className={styles.avatarLeft}>
    <Image src="/feed-avatar.png" alt="placeholder" width={40} height={66} />
    <div className={styles.avatarTextContainer}>
     <p className={styles.avatarText}>I want to ...</p>
    </div>
   </div>
   <div className={styles.avatarRight}>
    <button style={{ marginBottom: "10px" }} className={[styles.avatarButton, isPostActive ? styles.active : ''].join(' ')} onClick={setPostActive}>Create a Post</button>
    <button className={[styles.avatarButton, isArticleActive ? styles.active : ''].join(' ')} onClick={setArticleActive}>Create an Article</button>
   </div>
  </div>
 )
}

export default FeedAvatar