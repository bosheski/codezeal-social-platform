'use client';
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import styles from "./FeedSidebar.module.scss"
import { motion } from 'framer-motion';
import Link from 'next/link';
type Props = {
}

function FilterFeed({ }: Props) {
 const [activeFilter, setActiveFilter] = useState('popular');
 const pathname = usePathname();
 if (pathname.includes('/feed/posts')) {
  return (
   <div className={styles.filterFeedContainer}>
    <Link href="/feed/posts/popular">
     <motion.div
      key="popular"
      className={styles.filterItem}
      initial={activeFilter === 'popular' ? { y: 0 } : { y: '125%' }}
      animate={activeFilter === 'popular' ? { y: 0 } : { y: '125%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => setActiveFilter('popular')}
     >
      <motion.h3 className={activeFilter === 'popular' ? styles.activeFilter : styles.inactiveFilter}
       whileHover={{ scale: activeFilter === 'popular' ? '' : 1.05, cursor: 'pointer' }}
       transition={{ duration: 0.2, ease: 'easeOut' }}
      >Popular Posts</motion.h3>
     </motion.div>
    </Link>
    <Link href="/feed/posts/newest">
     <motion.div
      key="newest"
      className={styles.filterItem}
      initial={{ y: activeFilter === 'newest' ? '-100%' : '0' }}
      animate={{ y: activeFilter === 'newest' ? '-100%' : '0' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => setActiveFilter('newest')}
     >
      <motion.h3 className={activeFilter === 'newest' ? styles.activeFilter : styles.inactiveFilter}
       whileHover={{ scale: activeFilter === 'newest' ? '' : 1.05, cursor: 'pointer' }}
       transition={{ duration: 0.2, ease: 'easeOut' }}
      >Newest Posts</motion.h3>
     </motion.div>
    </Link>
   </div >
  )
 } else if (pathname.includes('/feed/articles')) {
  return (
   <div className={styles.filterFeedContainer}>
    <h3 className={styles.activeFilter}>Popular Articles</h3>
    <h3 className={styles.inactiveFilter}>Newest Articles</h3>
   </div>
  )
 }
 return (
  <div className={styles.filterFeedContainer}>
   <h3 className={styles.activeFilter}>Popular Categories</h3>
   <h3 className={styles.inactiveFilter}>Newest Categories</h3>
  </div>
 )
}

export default FilterFeed