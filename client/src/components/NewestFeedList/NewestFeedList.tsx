import { fetchNewestPosts, fetchPosts } from '../../app/actions'
import { PostProps } from '../../types/Post';
import Post from '../Post/Post';

type Props = {
 params: { name: string, filter: string },
 searchParams: { cat?: string }
}

async function NewestFeedList({ params, searchParams }: Props) {
 let data = [];
 // check params name and then switch filter
 if (params.name === 'posts') {
  if (searchParams) {
   data = await fetchNewestPosts(0, searchParams);
  } else {
   data = await fetchNewestPosts(0, undefined);
  }
 }
 return (
  <div>
   {data.map((post: PostProps, index: number) => (
    <Post key={post.id} post={post} index={index} />
   )
   )}
  </div>
 )
}

export default NewestFeedList