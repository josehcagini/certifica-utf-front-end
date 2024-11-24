import Image from 'next/image'

import loginProfileBackground from '@/assets/images/loginProfileBackground.svg'
import loginSidebarBackground from '@/assets/images/loginSidebarBackground.svg'
import logo from '@/assets/images/logo.svg'

import LoginForm from './_components/LoginForm'

export default function Login() {
  return (
    <>
      <div className="bg-backgroundGrey flex h-screen w-screen justify-between overflow-hidden opacity-75 blur-sm">
        <div className="bg-red h-full">
          <Image
            priority
            src={loginSidebarBackground}
            alt="Sidebar Background"
          />
        </div>

        <div className="p-6">
          <Image src={loginProfileBackground} alt="Profile Background" />
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform justify-center">
        <div className="bg-backgroundBlack hidden h-[70vh] w-[90%] items-center justify-center rounded-l-lg md:h-[80vh] md:w-[500px] lg:flex">
          <div className="mb-11 flex flex-col items-center justify-start gap-7 p-12">
            <Image src={logo} alt="Logo" className="h-24 w-24 object-contain" />
            <p className="text-center text-xl font-medium text-white">
              Obrigado por participar. Estamos muito entusiasmados por ter você
              a bordo.
            </p>
          </div>
        </div>
        <div className="flex h-[70vh] w-[90%] flex-col items-center justify-center rounded-r-lg bg-background md:h-[80vh] md:w-[500px]">
          <LoginForm />
        </div>
      </div>
    </>
  )
}
