import { fetchData } from '../../app/actions'
import { PostProps } from '../../types/Post';
import Post from '../Post/Post';

type Props = {
  params: {
    name: routeName,
    filter: "popular" | "newest"
  },
  searchParams: { cat?: string }
}
export type routeName = {
  name: "posts" | "articles" | "categories",
}
export type searchAllParams = {
  filter?: "popular" | "newest",
  offset: string,
  cat?: string,
}
type defaultSearchParams = {
  filter: "popular",
  offset: '0',
  cat: undefined,
}
async function FeedList({ params, searchParams }: Props) {
  const defaultSearchParams: defaultSearchParams = {
    filter: "popular",
    offset: '0',
    cat: undefined,
  }
  let searchAllParams: searchAllParams = {
    filter: params.filter,
    offset: '0',
    cat: searchParams.cat,
  }
  if (!params || !params.filter) {
    searchAllParams = defaultSearchParams
  }
  const data = await fetchData(params.name, searchAllParams)

  return (
    <div>

      {data.map((post: PostProps, index: number) => (
        <Post key={post.id} post={post} index={index} />
      ))}

    </div>
  )
}

export default FeedList