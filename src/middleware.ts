import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req) {
    const {
      nextUrl: { pathname },
      nextauth: { token },
    } = req

    if (pathname.startsWith('/login') && token) {
      return NextResponse.redirect(new URL('/', req.url))
    }

    if (['/', '/profile'].includes(pathname) && !token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const {
          nextUrl: { pathname },
        } = req

        return (!token && pathname.startsWith('/login')) || !!token
      },
    },
  }
)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
