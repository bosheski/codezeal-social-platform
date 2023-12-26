'use client';
import React from 'react'
import styles from "./FeedSidebar.module.scss"
import FeedAvatar from './FeedAvatar';
import FilterFeed from './FilterFeed';

type Props = {
}

function FeedSidebar({ }: Props) {

 return (
  <div className={styles.container}>
   <div className={styles.wrapper}>
    <FeedAvatar />
    <FilterFeed />
   </div>
  </div>
 )
}

export default FeedSidebar