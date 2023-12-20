import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_TOKEN } from './config/constants'

export async function middleware(req: NextRequest) {
  const { url, nextUrl, cookies } = req

  const isAuthorized = cookies.get(AUTH_TOKEN) && cookies.get(AUTH_TOKEN)?.value

  if (nextUrl.pathname === '/' && isAuthorized) {
    return NextResponse.redirect(new URL('/main/chat', url))
  }

  if (nextUrl.pathname !== '/' && !isAuthorized) {
    return NextResponse.redirect(new URL('/', url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

