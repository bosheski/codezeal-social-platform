import React, { Suspense } from 'react'
import FeedList, { routeName } from '../../../../components/FeedList/FeedList'

type Props = {
 searchParams: { p?: string, cat?: string }
 params: {
  name: routeName,
  filter: "popular" | "newest"
 }
}

function page({ params, searchParams }: Props) {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <FeedList params={params} searchParams={searchParams} />
  </Suspense>
 )
}

export default page