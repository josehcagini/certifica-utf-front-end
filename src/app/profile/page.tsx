import * as React from 'react'

import { getServerSession } from 'next-auth'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { authOptions } from '@/services/auth/nextAuth/authOptions'

import { ProfileForm } from './_components/ProfileForm'

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if (!user) return null
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage alt={user.name} src={user.image} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <Badge variant="secondary">{user.roles.join(', ')}</Badge>
          </div>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <ProfileForm user={user} />
    </div>
  )
}
