import React, { Suspense } from 'react'
import FeedList, { routeName } from '../../../components/FeedList/FeedList';


type Props = {
 params: {
  name: routeName,
  filter: "popular" | "newest"
 },
 searchParams: { cat?: string }
}

export default async function Feed({ params, searchParams }: Props) {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <FeedList params={params} searchParams={searchParams} />
  </Suspense>
 )
}
