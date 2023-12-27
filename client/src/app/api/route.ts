export const dynamic = 'force-dynamic'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
 const { search } = new URL(request.url)
 // remove the ?= from the url
 const searchRemove = search.replace('?=', '')
 console.log('search', search)
 const cookieStore = cookies()
 const session = cookieStore.get('_session')
 // decode the session
 const rawSession = decodeURIComponent(session ? session.value : '')
 console.log('session friom route', session)
 const response = await fetch(`http://localhost:3005/categories/search/${searchRemove}`, {
  headers: {
   'Content-Type': 'application/json',
   'Cookie': `_session=${rawSession}; path=/;`,
  }
 })
 return new Response(response.body, {
  status: response.status,
  statusText: response.statusText,
 })
}