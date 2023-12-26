import React from 'react'
import styles from "./page.module.scss"
import FeedSidebar from '../../components/FeedSidebar/FeedSidebar';
import FeedFooter from '../../components/FeedFooter/FeedFooter';
import PostCreate from '../../components/PostCreate/PostCreate';
import FeedNavbar from '../../components/FeedNavbar/FeedNavbar';

type Props = {
}

async function Category({ }: Props) {
 const data = undefined;
 return (
  <div className={styles.container}>
   <div className={styles.feedWrapper}>
    <FeedSidebar />
    <div className={styles.categoryContainer}>
     <PostCreate />
     <FeedNavbar />
     {data ? <div>
      Category
     </div> : <div>
      You are not following any category yet.
      Please follow a category to see category or select All Categories.
     </div>}
    </div>
    <FeedFooter />
   </div>
  </div>
 )
}

export default Category