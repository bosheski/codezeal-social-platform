'use client' // Error components must be Client Components

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {

  }, [error])

  return (
    <div>
      <p>{error.message}</p>
    </div>
  )
}