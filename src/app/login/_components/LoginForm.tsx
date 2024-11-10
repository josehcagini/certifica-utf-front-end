'use client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Loader2 } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCredentialsSignIn } from '@/hooks/useSignIn'
import { formSchema, FormSchema } from '@/utils/validation/form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function LoginForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ra: '',
      password: '',
    },
  })
  const router = useRouter()
  const { loading, error, success, triggerCredentialsSignIn } =
    useCredentialsSignIn()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form
  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    await triggerCredentialsSignIn(data)
  }

  if (success) {
    router.push('/')
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="h-28">
            <FormField
              control={form.control}
              name="ra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ra</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: a9999999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="h-28">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                  {error && <p className="text-destructive">{error}</p>}
                </FormItem>
              )}
            />
          </div>

          <div className="py-6">
            <Button
              disabled={isSubmitting || loading}
              type="submit"
              className="w-full bg-[#bd1e59] text-white"
            >
              {isSubmitting || loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <></>
              )}
              Acessar
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">OU ACESSAR COM</span>
        </div>
      </div>

      <div className="mt-2">
        <Button
          disabled={isSubmitting || loading}
          className="w-full border border-gray-300 bg-white text-gray-700 shadow-sm"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          Google
        </Button>
      </div>
    </>
  )
}
