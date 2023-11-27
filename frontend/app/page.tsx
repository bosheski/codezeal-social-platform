import FeedPosts from "../components/FeedPosts"
import { getCookies } from 'next-client-cookies/server';
const Feed: React.FC = async () => {

  return (
    <main>
      <FeedPosts />
    </main>
  )
}

export default Feed
