'use client'

import { useSession } from 'next-auth/react'

export default function SessionShow() {
  const session = useSession()

  return (
    <div>
      <h1>SessionShow</h1>

      <p>client session {JSON.stringify(session)}</p>
    </div>
  )
}
