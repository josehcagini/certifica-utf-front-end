'use client'

import { useState } from 'react'

import { signIn } from 'next-auth/react'

type triggerCredentialsSignInProps = {
  ra: string
  password: string
}

export const useCredentialsSignIn = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null | undefined>(null)
  const [success, setSuccess] = useState(false)

  const triggerCredentialsSignIn = async (
    props: triggerCredentialsSignInProps
  ) => {
    try {
      setLoading(true)
      setError(null)
      const res = await signIn('credentials', {
        ra: props.ra,
        password: props.password,
        redirect: false,
      })
      if (res?.ok) {
        setSuccess(true)
      } else {
        if (res?.status === 401) {
          setError('Usuário ou senha inválidos')
        } else {
          setError(res?.error)
        }
      }
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
    triggerCredentialsSignIn,
  }
}
