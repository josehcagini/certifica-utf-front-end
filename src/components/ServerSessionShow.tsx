import { getServerSession } from 'next-auth'

import { authOptions } from '@/services/auth/nextAuth/authOptions'

export default async function ServerSessionShow() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <h1>ServerSessionShow</h1>

      <p>server session {JSON.stringify(session)}</p>
    </div>
  )
}
