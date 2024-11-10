import { GaugeIcon } from 'lucide-react'

import LoginForm from './_components/LoginForm'

export default function Login() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex w-1/2 flex-col justify-between bg-black p-12 text-white">
        <div>
          <GaugeIcon className="h-8 w-8 text-white" />
          <h1 className="mt-4 text-3xl font-semibold">Acme Inc</h1>
        </div>
        <div>
          <blockquote>
            "This library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before."
          </blockquote>
          <p className="mt-4">Sofia Davis</p>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center p-12">
        <div className="w-full max-w-md">
          <div className="rounded-lg bg-white px-6 py-8 shadow sm:px-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <p className="mt-2 text-sm text-gray-600">
                Acesso a Certifica UTFPR
              </p>
            </div>
            <LoginForm />
            <p className="mt-6 text-xs text-gray-500">
              Ao clicar em "Acessar", você concorda com os termos e condições
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
