'use client'

import { useState } from 'react'

import { signOut } from 'next-auth/react'

export const useSignOut = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null | undefined>(null)
  const [success, setSuccess] = useState(false)

  const triggerSignOut = () => {
    try {
      setLoading(true)
      setError(null)
      signOut({ callbackUrl: '/' })
      setSuccess(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    success,
    triggerSignOut,
  }
}
