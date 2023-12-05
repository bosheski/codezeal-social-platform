import FeedPosts from "../components/FeedPosts"
import styles from "./page.module.scss"
const Feed: React.FC = () => {

  return (
    <main className={styles.container}>

      <FeedPosts />
    </main>
  )
}

export default Feed
